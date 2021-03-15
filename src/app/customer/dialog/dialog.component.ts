import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { forkJoin ,Observable, Subscription} from 'rxjs';
import { UploadService, CustomerService, MasterService, AuthenticationService, User } from 'src/app/shared';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { map, startWith} from 'rxjs/operators';
import { NgSelectComponent, NgSelectConfig } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { DialogFirstComponent } from '../dialog-first/dialog-first.component';

export interface ddlBank {
    bankname: string;
    adbankname: string;
    bankno:string;
    banknameen:string;
}
export interface dlBankBranch {
    bankBranchName: string;
    bankBranchCode:string;
    bankCode:string;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    public listItems: Array<ddlBank> = [];
    public listItemsBankName: Array<string> = [];

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        public uploadService: UploadService,
        public dialog: MatDialog,
        private srvCS: CustomerService,
        private snackBar: MatSnackBar,
        private router: Router,
        private master: MasterService,
        private authen:AuthenticationService,
        private config: NgSelectConfig,
        private toasterService: ToastrService,
     
    ) { 
        this.config.notFoundText = 'Custom not found';
    }

    @ViewChild('file', { static: false }) file;
    isbeingSearched: boolean = false;
    @ViewChild('select1',{ static: false })
    select1Comp: NgSelectComponent;

    public files: Set<File> = new Set();

    progress;
    canBeClosed = true;
    confirmed = false;
    primaryButtonText = 'Upload';
    showCancelButton = true;
    showButton = false;
    uploading = false;
    uploadSuccessful = false;
    _hyrf_id: string;
    _isMobile: string;

    bankName = {} as ddlBank;
    bankAccountNo: any;
    bankAccountName:any;
    bankbranch = {} as dlBankBranch;
    
    listBankBranch:any[];

    temp = {} as ddlBank;

    busy: Subscription;

    loading: boolean;
    personalid:string;

    tooltips=false;

    ngOnInit() {
        this.dropdownBankMasterRefresh();
        this.dropdownBankNameListRefresh(Number(localStorage.getItem('_hyrf_id')));

        // localStorage.setItem('bankaccountname', rowListData.bankaccountname);
        // localStorage.setItem('bankaccountno', rowListData.bankaccountno);
        // localStorage.setItem('bankcode', rowListData.bankcode);

        this.bankName.adbankname = localStorage.getItem('bankcode');
        this.bankAccountNo = localStorage.getItem('bankaccountno') !== 'null' ? localStorage.getItem('bankaccountno') : '';
        this.bankAccountName = localStorage.getItem('bankaccountname');
        this.bankName.banknameen = localStorage.getItem('banknameen');

        console.log('rowListData1', this.bankName);
        console.log('rowListData2', this.bankAccountNo);
        console.log('rowListData3', this.bankAccountName);
        this.bankAccountName = '';
        
    }

    changdropdown()
    {
        if(this.bankName.bankno=== '999'){
            this.bankbranch = {} as dlBankBranch;
        }
        this.authen.LoginCRM().subscribe(data => {
            this.master.getBankBranch(data.token,this.bankName.bankno).subscribe(data =>{
                this.listBankBranch = data;
                
                console.log('bankbranchCount',this.bankName.bankno);
                if(this.listBankBranch.length === 0 && this.bankName.bankno !== '999'){
                    console.log('qwertyuiop',this.listBankBranch);
                    console.log('qwertyuiop',this.bankName.bankno);
                    this.bankbranch = {bankBranchName: 'สำนักงานใหญ่' , bankBranchCode: '0001'} as dlBankBranch;
                }else{
                    this.bankbranch = {} as dlBankBranch;
                }
                // this.bankbranch.bankBranchName = 'สำนักงานใหญ่';
            })
          });

    }


    onClose() {
        console.log('ชื่อธนาคาร', this.bankName.adbankname);
        console.log('ชื่อบัญชีลูกค้า', this.bankAccountName);
        console.log('เลขบัญชี', this.bankAccountNo);
        if(this.bankName.bankno === '999'){
            this.bankbranch.bankBranchCode = '0000';
            this.bankbranch.bankBranchName = '-';
        }
        else if (this.bankName.bankno !== '999' && this.listBankBranch.length === 0){
            this.bankbranch.bankBranchName = 'สำนักงานใหญ่';
            this.bankbranch.bankBranchCode = '0001';
        }
        
        if (this.bankAccountNo && this.bankName.adbankname && this.bankAccountName && ((this.bankName.bankno !=='999'&&(this.bankbranch&&this.bankbranch.bankBranchName))||(this.bankName.bankno ==='999'&&(this.bankbranch&&this.bankbranch.bankBranchName)))) {
            this.busy = this.master.bankSubmit(this._hyrf_id, 
                                   this.bankName.adbankname, 
                                   this.bankAccountNo, 
                                   this.bankAccountName, 
                                   this.bankName.bankno,
                                   this.bankbranch.bankBranchCode,
                                   this.bankbranch.bankBranchName).subscribe(res => { 
                console.log('Submit1', res);
                this.busy = this.uploadService.imageMerge2PDF(this._hyrf_id).subscribe(res => {
                    this.toasterService.success('Success');
                    
                    this.dialogRef.close();
                });

            });
            
        } else {
            this.loading = false;
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: '350px',
                data: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            });
        }
        
    }

    onClose2() {
        this.dialogRef.close();
    }

    onFilesAdded() {
        let regexp = new RegExp('^[\\sa-zA-Z\\d\\[\\]\\{\\}\\/\\\\$&+,:;=?~`@#|\'"<>.^*()%!_-]+$');
        const files: { [key: string]: File } = this.file.nativeElement.files;
        console.log(this.file.nativeElement.files[0].name)
        console.log(regexp.test(this.file.nativeElement.files[0].name))
        if(regexp.test(this.file.nativeElement.files[0].name))
        {
            for (const key in files) {
                if (!isNaN(parseInt(key))) {
                    this.files.add(files[key]);
                }
            }
            this.showButton = true;
        }
        else
        {
            const dialogRef = this.dialog.open(WarningDialogComponent, {
                width: '300px',
                data: 'ชื่อไฟล์ต้องเป็นภาษาอังกฤษเท่านั้น\nThe file name must be in English only.'
            });
        }

    }
    
    addFiles() {

        if (((this.bankName.bankno !=='999'&&(this.bankbranch&&this.bankbranch.bankBranchName)&&(this.bankAccountNo&&this.bankAccountNo)&&(this.bankAccountName&&this.bankAccountName))||(this.bankName.bankno ==='999'&&!(this.bankbranch&&this.bankbranch.bankBranchName))))
        {
           this.file.nativeElement.click();
        }
        else
        {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: '300px',
                data: 'กรุณากรอกข้อมูลให้ครบถ้วน/Please fill up all required fields.'
            });
        }
    }
    // closeDialog1() {
    //     console.log('xxx');
    // }

    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: 'คุณต้องการยืนยันการแนบเอกสารใช่หรือไม่ Do you want to confirm your attached files?'
        });

        console.log('ชื่อธนาคาร', this.bankName.adbankname);
        console.log('ชื่อบัญชีลูกค้า', this.bankAccountName);
        console.log('เลขบัญชี', this.bankAccountNo);


        dialogRef.afterClosed().subscribe(result => {
            console.log(this.confirmed);
            if (result) {
                // console.log('Yes clicked');

                if (this.uploadSuccessful) {
                    return this.dialogRef.close();
                }

                // set the component state to "uploading"
                this.uploading = true;
                this._hyrf_id = localStorage.getItem('_hyrf_id');
                this._isMobile = localStorage.getItem('isMobile');

                // start the upload and save the progress map
                this.progress = this.uploadService.upload(this.files, this._hyrf_id, this._isMobile);
                console.log(this.progress);
                for (const key in this.progress) {
                    this.progress[key].progress.subscribe(val => console.log(val));
                }

                // convert the progress map into an array
                const allProgressObservables = [];
                for (const key in this.progress) {
                    allProgressObservables.push(this.progress[key].progress);
                }

                // Adjust the state variables

                // The OK-button should have the text "Finish" now
                this.primaryButtonText = 'Finish';

                // The dialog should not be closed while uploading
                this.canBeClosed = false;
                this.dialogRef.disableClose = true;

                // Hide the cancel-button
                this.showCancelButton = false;

                // When all progress-observables are completed...
                forkJoin(allProgressObservables).subscribe(end => {
                    // ... the dialog can be closed again...
                    this.canBeClosed = true;
                    this.dialogRef.disableClose = false;

                    // ... the upload was successful...
                    this.uploadSuccessful = true;

                    // ... and the component is no longer uploading
                    this.uploading = false;
                    this.confirmed = true;
                    // console.log('before call service senddoc');
                    this.srvCS.sendDocRefund(this._hyrf_id).subscribe(res => {
                        console.log(res);
                        // this.router.navigate(['']); // ON SUCCESS
                        // this.snackBar.open('Updated transaction Successful...!! [' + res.hyrf_id + ']', '', {
                        //     duration: 3000
                        // });
                    });
                });
            }
        });
    }

    dropdownBankMasterRefresh() {
        this.master.getBankMaster().subscribe(data => {
            data.forEach(element => {
                // console.log('ชื่อธนาคาร', element);
                this.temp = {} as ddlBank;
                this.temp.bankname = element.bankname;
                this.temp.adbankname = element.adbankname;
                this.temp.bankno = element.bankid;
                this.temp.banknameen = element.banknameen;
                this.listItems.push(this.temp);
            });
        });
    }

    dropdownBankNameListRefresh(id: number) {
        this.master.getBankAccountName(id).subscribe(data => {
            data.forEach(element => {
                this.listItemsBankName.push(element['fullname']);
                console.log('ll',this.listItemsBankName)
            });
        });
    }
}
