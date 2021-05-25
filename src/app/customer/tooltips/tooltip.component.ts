import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class DialogTooltipComponent implements OnInit {
constructor(
    public dialogRef: MatDialogRef<DialogTooltipComponent>,
    private toasterService: ToastrService,
    ) { }
    ngOnInit() {
    }
      onClose2() {
        this.dialogRef.close();
    }

    onclick() {
        this.toasterService.success('Success');
    }
}
