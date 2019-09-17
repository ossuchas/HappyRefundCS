import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService, CustomerService } from '../shared';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
import { MatSnackBar, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { forkJoin } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { DialogTermComponent } from './dialog-term/dialog-term.component';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    constructor(
        private srvUpload: UploadService,
        private srvCS: CustomerService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    isValidate = false;
    listData: MatTableDataSource<any>;

    displayedColumn: string[] = [
        'Options',
        'project',
        'unitnumber',
        'contractnumber',
        'transferdateapprove',
        'remainingtotalamount',
        'doc_sent_status'
    ];

    ngOnInit() {
        // // const { node_env } = require('../../config');
        // const { node_env } = require('../../config');
        // console.log(`Your port is ${node_env}`);
    }

    validate(form: NgForm) {
        // console.log(form.value);

        this.srvCS.checkPersonalId(form.value.personalid).subscribe(
            data => {
                this.isValidate = true;
                this.listData = new MatTableDataSource(data);
                console.log(data);
                localStorage.setItem('currentCs', JSON.stringify(data));
                const p_hyrf_id = JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id;
                localStorage.setItem('_hyrf_id', JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id);
                localStorage.setItem('_personal_id', JSON.parse(localStorage.getItem('currentCs'))[0].personcardid);
            },
            error => {
                this.isValidate = false;
                // console.log(error);
                this.snackBar.open(error.error['message'], '', {
                    duration: 5000
                });
            }
        );
    }

    upload(form: NgForm) {
        console.log('form2');
    }

    // onView(hyrf: CrmContactRefund) {
    onView() {
        console.log('kkkk');
        // this.service.formData = hyrf;
        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;
        // dialogConfig.width = '55%';
        // dialogConfig.data = {
        //     hyrf_id: hyrf.hyrf_id
        // };
        // this.dialog.open(Tf02imgviewPageComponent, dialogConfig);
    }

    public openUploadDialog() {
        const dialogRef = this.dialog.open(DialogTermComponent);
        // const dialogRef1 = this.dialog.open(DialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            // console.log(`Dialog result: ${result}`);
            // console.log(result);

            if (result) {
                console.log('kai result');
                console.log(result);
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
                            this.listData = new MatTableDataSource(data);
                            console.log(data);
                            localStorage.setItem('currentCs', JSON.stringify(data));
                            const p_hyrf_id = JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id;
                            localStorage.setItem('_hyrf_id', JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id);
                            localStorage.setItem('_personal_id', JSON.parse(localStorage.getItem('currentCs'))[0].personcardid);
                        },
                        error => {
                            this.isValidate = false;
                            // console.log(error);
                            this.snackBar.open(error.error['message'], '', {
                                duration: 5000
                            });
                        }
                    );
                });
            }
        });
    }
}
