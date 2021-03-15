import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class DialogTooltipComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<DialogTooltipComponent>,
    ) { }
    ngOnInit() {
    }
      onClose2() {
        this.dialogRef.close();
    }
}
