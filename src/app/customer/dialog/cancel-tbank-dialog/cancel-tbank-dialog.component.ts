import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-cancel-tbank-dialog',
  templateUrl: './cancel-tbank-dialog.component.html',
  styleUrls: ['./cancel-tbank-dialog.component.scss']
})
export class CanceltbankDialogComponent {

  constructor(public dialogRef: MatDialogRef<CanceltbankDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) {}
  onNoClick(): void {
      this.dialogRef.close();
  }

}
