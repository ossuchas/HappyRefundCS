import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService, CustomerService, CrmContactRefund, CrmGetAgreement, MasterService, AuthenticationService } from '../shared';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
import { MatSnackBar, MatTableDataSource, MatDialog, MatDialogConfig, MatCell, MatCellDef, MatColumnDef } from '@angular/material';

import { forkJoin, from } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { DialogTermComponent } from './dialog-term/dialog-term.component';
import { ImgviewPageComponent } from './imgview-page/imgview-page.component';
import { DialogFirstComponent } from './dialog-first/dialog-first.component';
import { Tf01docstatusPipe } from '../shared/pipes';
import { ToastrService } from 'ngx-toastr';
import { DialogTooltipComponent } from './tooltips/tooltip.component';
import { WarningDialogComponent } from './dialog/warning-dialog/warning-dialog.component';
import { CanceltbankDialogComponent } from './dialog/cancel-tbank-dialog/cancel-tbank-dialog.component';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    constructor(
        // private srvUpload: UploadServiceisValidateUpload,
        private srvCS: CustomerService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        private master: MasterService,
        private authen: AuthenticationService,
        private toasterService: ToastrService,
    ) { }
    @Output() welcomeHomeFlag = new EventEmitter<string>();
    isValidate = false;
    isMobile = false;
    isValidateUpload = false;
    listData: MatTableDataSource<any>;
    btnUpload = true;
    Remark: string;
    personalid: string;
    tooltips = false;
    sentDataRefund: CrmContactRefund[] = [];

    totalAmount: number;
    shWelcomehome: boolean;
    shRefund: boolean;
    shRFNandWel: boolean;

    isWelcomehome: boolean;
    isRefund: boolean;

    displayedColumn: string[] = [
        // 'Options',
        'project',
        'unitnumber',
        'contractnumber',
        'transferdateapprove',
        'remainingtotalamount',
        'welcomehomeamount',
        'totalamount',
        'doc_sent_status',
        'doc_upload_btn'
    ];

    displayedColumnNowel: string[] = [
        // 'Options',
        'project',
        'unitnumber',
        'contractnumber',
        'transferdateapprove',
        'remainingtotalamount',
        'doc_sent_status',
        'doc_upload_btn'
    ];

    displayedColumnNoRFN: string[] = [
        // 'Options',
        'project',
        'unitnumber',
        'contractnumber',
        'transferdateapprove',
        'welcomehomeamount',
        'doc_sent_status',
        'doc_upload_btn'
    ];




    ngOnInit() {
        // this.srvCS.formData = hyrf;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '550px';
        this.dialog.open(CanceltbankDialogComponent, dialogConfig);

        // this.isMobile = window.orientation > -1;
        // alert(this.isMobile ? 'Mobile' : 'Not mobile');

        // if (this.isMobile) {
        //     localStorage.setItem('isMobile', '1');
        // } else {
        //     localStorage.setItem('isMobile', '0');
        // }

        localStorage.setItem('isMobile', '0'); // Fix flag Mobile = false on web browser


    }
    validate(form: NgForm) {
        // console.log(form.value);
        this.srvCS.checkPersonalId(form.value.personalid).subscribe(
            data => {
                localStorage.setItem('flag_appv', data[0].ac01_appv_flag);
                this.isValidate = true;
                this.listData = new MatTableDataSource(data.filter(item => item.bringtolegalentity_flag !== 'Y'));
                // this.sentDataRefund = data.filter((item) => item.bringtolegalentity_flag !== 'Y');
                console.log(  this.sentDataRefund);
                // this.totalAmount=data[0].remainingtotalamount + data[0].welcomehome_amount;

                // console.log(data);
                localStorage.setItem('currentCs', JSON.stringify(data));
                // KAI 2019-12-14
                // const p_hyrf_id = JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id;
                // localStorage.setItem('_hyrf_id', JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id);
                localStorage.setItem('_personal_id', JSON.parse(localStorage.getItem('currentCs'))[0].personcardid);
                const doc_sent_status = JSON.parse(localStorage.getItem('currentCs'))[0].doc_sent_status;
                if (doc_sent_status === 'A') {
                    this.isValidateUpload = false;
                } else {
                    this.isValidateUpload = true;
                }

                this.isWelcomehome = false;
                this.isRefund = false;
                data.filter(item => item.bringtolegalentity_flag !== 'Y').forEach(item => {
                    if (item.welcomehome_flag === 'Y') {
                        this.isWelcomehome = true;
                    }
                    if (item.remainingtotalamount > 0) {
                        this.isRefund = true;
                    }
                });
            },

            error => {
                console.log(error);
                if (error.error && error.error.message === 'No Data Found') {
                    this.isValidate = false;
                    this.toasterService.error('ไม่พบข้อมูลเลขที่บัตรประชาชนหรือพาสปอร์ต/Your Personal ID or Passport ID not found in the system!');
                } else {
                this.isValidate = false;
                this.toasterService.error('กรุณากรอกเลขบัตรประชาชนหรือพาสปอร์ต/Please fill in Personal ID or Passport ID');
            }
        }
        );

    }

    upload(form: NgForm) {
        console.log('form2');
    }

    // onView(hyrf: CrmContactRefund) {
    onView(_hyrf_id: Number, ac_appv_flag: string) {
        // const _hyrf_id = localStorage.getItem('_hyrf_id');
        console.log(_hyrf_id);
        console.log('flaggggggggggggggggg', ac_appv_flag);
        localStorage.setItem('ac01_appv_flag', ac_appv_flag);
        // this.srvCS.formData = hyrf;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        dialogConfig.height = '500px';
        dialogConfig.data = {
            hyrf_id: _hyrf_id

        };

        this.dialog.open(ImgviewPageComponent, dialogConfig);
    }

    public openUploadDialog() {
        const dialogRef = this.dialog.open(DialogTermComponent);
        // const dialogRef1 = this.dialog.open(DialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            // console.log(`Dialog result: ${result}`);
            // console.log(result);

            if (result) {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.width = '90%';

                // this.isValidate = false;

                const dialogRef1 = this.dialog.open(DialogComponent, dialogConfig);

                dialogRef1.afterClosed().subscribe(result1 => {
                    const per_id = localStorage.getItem('_personal_id');
                    this.srvCS.checkPersonalId(per_id).subscribe(
                        data => {

                            this.isValidate = true;
                            this.listData = new MatTableDataSource(data.filter(item => item.bringtolegalentity_flag !== 'Y'));
                            // console.log(data);
                            localStorage.setItem('currentCs', JSON.stringify(data));

                            const p_hyrf_id = JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id;

                            localStorage.setItem('_hyrf_id', JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id);
                            localStorage.setItem('_personal_id', JSON.parse(localStorage.getItem('currentCs'))[0].personcardid);
                            console.log('data', data);
                        },
                        error => {
                            // this.isValidate = false;
                            this.snackBar.open(error.error['message'], '', {
                                duration: 5000
                            });
                        }
                    );
                });
            }
        });
    }

    uploadByid(item: CrmContactRefund) {
        console.log(item);
        // console.log('uploadByid = ' + item.hyrf_id);
        localStorage.setItem('_hyrf_id', item.hyrf_id.toString());

        localStorage.setItem('bankaccountname', item.bankaccountname);
        localStorage.setItem('bankaccountno', item.bankaccountno);
        localStorage.setItem('bankcode', item.bankcode);
        localStorage.setItem('bankBranchName', item.bot_bank_branch_name);
        // localStorage.setItem('_welcomehomeflag', item.welcomehome_flag);
        // localStorage.setItem('_welcomehome_accept_date', item.welcomehome_accept_datetime.toString());


        const dialogRef = this.dialog.open(DialogTermComponent);
        dialogRef.componentInstance.hyrf_id = item.hyrf_id;

        dialogRef.componentInstance.welcomeHomeFlag = item.welcomehome_flag;
        dialogRef.componentInstance.welcomeHomeAcceptDatetime = item.welcomehome_accept_datetime;
        dialogRef.componentInstance.welcomehomeAmount = item.welcomehome_amount;
        dialogRef.componentInstance.refundAmount = item.remainingtotalamount;
        dialogRef.componentInstance.transfer_id = item.transferid;
        dialogRef.componentInstance.welcomehome_stage = item.welcomehome_stage;

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
                dialogConfig.width = '90%';

                const dialogRef1 = this.dialog.open(DialogComponent, dialogConfig);

                dialogRef1.afterClosed().subscribe(result1 => {
                    const per_id = localStorage.getItem('_personal_id');
                    this.srvCS.checkPersonalId(per_id).subscribe(
                        data => {
                            this.isValidate = true;
                            this.listData = new MatTableDataSource(data.filter(item => item.bringtolegalentity_flag !== 'Y'));
                            // console.log(data);
                            // console.log('asdasdasd',result1)
                            // this.toasterService.success('Success');
                            localStorage.setItem('currentCs', JSON.stringify(data));

                            // const p_hyrf_id = JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id;

                            localStorage.setItem('_hyrf_id', item.hyrf_id.toString());
                            localStorage.setItem('_personal_id', JSON.parse(localStorage.getItem('currentCs'))[0].personcardid);
                            // localStorage.setItem('_personal_id', JSON.parse(localStorage.getItem('currentCs'))[0].welcomehome_flag);
                        },

                        error => {
                            this.isValidate = false;
                            this.snackBar.open(error.error['message'], '', {
                                duration: 5000
                            });
                        }
                    );
                });
            }
        });
    }
    openTooltip() {
        this.dialog.open(DialogTooltipComponent);
        this.toasterService.success('Success');
    }
}
