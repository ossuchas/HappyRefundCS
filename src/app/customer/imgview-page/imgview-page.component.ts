import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CrmContactRefundListImgUrlService, CrmContactRefundListImgUrl, MasterService, AuthenticationService } from 'src/app/shared';
import { MatTableDataSource, MatDialog, MatDialogConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-imgview-page',
    templateUrl: './imgview-page.component.html',
    styleUrls: ['./imgview-page.component.scss']
})
export class ImgviewPageComponent implements OnInit {
    toasterService: any;

    constructor(
        public dialogbox: MatDialogRef<ImgviewPageComponent>,
        public service: CrmContactRefundListImgUrlService,
        private snackBar: MatSnackBar,
        private master: MasterService,
        private authen:AuthenticationService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.service.listen().subscribe((m: any) => {
            console.log(m);
            this.refreshDataList(this.data.hyrf_id);
        });
    }

    listData: MatTableDataSource<any>;
    displayedColumn: string[] = ['View', 'Delete', 'img_name'];

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

   onDelete(Data: CrmContactRefundListImgUrl){
        this.authen.LoginCRM().subscribe(data => {
            this.master.deleteImg(data.token,Data.img_id).subscribe(data =>{
                //this.listBankBranch = data;
                //console.log(this.bankbranch);
                console.log(Data.img_id);
            })
          });
          this.toasterService.success('Delete Success');
   }
}
