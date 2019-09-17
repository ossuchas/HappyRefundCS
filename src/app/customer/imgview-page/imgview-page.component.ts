import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CrmContactRefundListImgUrlService, CrmContactRefundListImgUrl } from 'src/app/shared';
import { MatTableDataSource, MatDialog, MatDialogConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-imgview-page',
    templateUrl: './imgview-page.component.html',
    styleUrls: ['./imgview-page.component.scss']
})
export class ImgviewPageComponent implements OnInit {
    constructor(
        public dialogbox: MatDialogRef<ImgviewPageComponent>,
        public service: CrmContactRefundListImgUrlService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.service.listen().subscribe((m: any) => {
            console.log(m);
            this.refreshDataList(this.data.hyrf_id);
        });
    }

    listData: MatTableDataSource<any>;
    displayedColumn: string[] = ['Options', 'img_seqn', 'img_name'];

    ngOnInit() {
        this.refreshDataList(this.data.hyrf_id);
    }

    onClose() {
        this.dialogbox.close();
    }

    refreshDataList(id: number) {
        this.service.getImgList(id).subscribe(data => {
            this.listData = new MatTableDataSource(data);
        });
    }

    onView(data: CrmContactRefundListImgUrl) {
        console.log(data.img_id);
        const img_url = data.img_url;
        window.open(img_url, '_blank');
    }
}
