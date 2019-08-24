import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService, CustomerService } from '../shared';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
import { MatSnackBar, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { forkJoin } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

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

    displayedColumn: string[] = ['project', 'unitnumber', 'contractnumber', 'transferdateapprove', 'remainingtotalamount'];

    ngOnInit() {}

    validate(form: NgForm) {
        console.log(form.value);

        this.srvCS.checkPersonalId(form.value.personalid).subscribe(
            data => {
                this.isValidate = true;
                this.listData = new MatTableDataSource(data);
                console.log(data);
                localStorage.setItem('currentCs', JSON.stringify(data));
                // const p_hyrf_id = JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id;
                localStorage.setItem('_hyrf_id', JSON.parse(localStorage.getItem('currentCs'))[0].hyrf_id);
                localStorage.setItem('_personal_id', JSON.parse(localStorage.getItem('currentCs'))[0].personcardid);
            },
            error => {
                this.isValidate = false;
                console.log(error);
                this.snackBar.open(error.error['message'], '', {
                    duration: 5000
                });
            }
        );
    }

    upload(form: NgForm) {
        console.log('form2');
    }

    public openUploadDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';

        const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    }
}
