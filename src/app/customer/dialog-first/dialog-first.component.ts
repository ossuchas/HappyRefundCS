import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog-first',
    templateUrl: './dialog-first.component.html',
    styleUrls: ['./dialog-first.component.scss']
})
export class DialogFirstComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<DialogFirstComponent>) {}

    ngOnInit() {}
    onClose() {
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
