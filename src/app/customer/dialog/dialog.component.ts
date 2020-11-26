import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';
import { UploadService, CustomerService, MasterService } from 'src/app/shared';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

export interface ddlBank {
    bankname: string;
    adbankname: string;
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
    ) { }

    @ViewChild('file', { static: false }) file;

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

    bankName: any;
    bankAccountNo: any;
    bankAccountName: any;

    temp = {} as ddlBank;

    ngOnInit() {
        this.dropdownBankMasterRefresh();
        this.dropdownBankNameListRefresh(Number(localStorage.getItem('_hyrf_id')));

        // localStorage.setItem('bankaccountname', rowListData.bankaccountname);
        // localStorage.setItem('bankaccountno', rowListData.bankaccountno);
        // localStorage.setItem('bankcode', rowListData.bankcode);

        this.bankName = localStorage.getItem('bankcode');
        this.bankAccountNo = localStorage.getItem('bankaccountno');
        this.bankAccountName = localStorage.getItem('bankaccountname');


        console.log('rowListData1', this.bankName);
        console.log('rowListData2', this.bankAccountNo);
        console.log('rowListData3', this.bankAccountName);
    }

    onClose() {

        console.log('ชื่อธนาคาร', this.bankName);
        console.log('ชื่อบัญชีลูกค้า', this.bankAccountName);
        console.log('เลขบัญชี', this.bankAccountNo);

        this.master.bankSubmit(this._hyrf_id, this.bankName, this.bankAccountNo, this.bankAccountName).subscribe(res => {
            console.log('Submit1', res);
        });

        this.uploadService.imageMerge2PDF(this._hyrf_id).subscribe(res => {
            console.log('Submit2', res);
        });
        this.dialogRef.close();
    }

    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        for (const key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.add(files[key]);
            }
        }
        this.showButton = true;
    }

    addFiles() {
        this.file.nativeElement.click();
    }
    // closeDialog1() {
    //     console.log('xxx');
    // }

    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: 'Do you confirm Upload Document ?'
        });

        console.log('ชื่อธนาคาร', this.bankName);
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
                this.listItems.push(this.temp);
            });
        });
    }

    dropdownBankNameListRefresh(id: number) {
        this.master.getBankAccountName(id).subscribe(data => {
            data.forEach(element => {
                // console.log('ชื่อบัญชีลูกค้า', element);
                this.listItemsBankName.push(element['fullname']);
            });
        });
    }


}
