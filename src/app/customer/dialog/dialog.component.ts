import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';
import { UploadService, CustomerService, MasterService } from 'src/app/shared';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    public listItems: Array<string> = [];
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

    test: any;
    bankAccountNo: any;
    bankAccountName: any;

    ngOnInit() {
        this.dropdownBankMasterRefresh();
        this.dropdownBankNameListRefresh(Number(localStorage.getItem('_hyrf_id')));
    }

    onClose() {
        this.uploadService.imageMerge2PDF(this._hyrf_id).subscribe(res => {
            console.log(res);
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
        console.log('ชื่อธนาคาร', this.test);
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
                console.log('ชื่อธนาคาร', element);

                this.listItems.push(element['bankname']);

            });
        });
    }

    dropdownBankNameListRefresh(id: number) {
        this.master.getBankAccountName(id).subscribe(data => {
            data.forEach(element => {
                console.log('ชื่อบัญชีลูกค้า', element);
                this.listItemsBankName.push(element['fullname']);

            });
        });
    }

    test1() {
        console.log('test', this.test);
        console.log('test', this.bankAccountName);
    }
}
