import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, CrmGetAgreement, MasterService } from 'src/app/shared';

@Component({
  selector: 'app-dialog-term',
  templateUrl: './dialog-term.component.html',
  styleUrls: ['./dialog-term.component.scss']
})


export class DialogTermComponent implements OnInit {

  constructor(
    private MSsrv: MasterService,
    private master: MasterService,
    private authen: AuthenticationService,
    private toasterService: ToastrService,
  ) { }
  @Input() hyrf_id: number;
  @Input() welcomeHomeFlag: string;
  @Input() welcomeHomeAcceptDatetime: Date;
  @Input() welcomehomeAmount: number;
  @Input() refundAmount: number;
  @Input() transfer_id: string;

  showTha: any;
  showEng: any;

  showBtnTha: any;
  showBtnEng: any;

  checkWelcomehome: boolean;

  openButton = false;
  urlMemo: string;
  dataItem: any;
  dataItem2: any;
  welcomehome_stage: string;

  ngOnInit() {
    console.log('welcomeHomeFlag', this.welcomeHomeFlag);
  this.showTha = true;
  this.showEng = true;

  if (this.welcomeHomeAcceptDatetime === null) {
    this.checkWelcomehome = false;
  } else {
    this.checkWelcomehome = true;
  }

  }

  // onClick(){
  //   console.log('before',this.openButton)
  //   if(this.openButton === false){
  //     this.openButton = true
  //   }
  //   else {
  //     this.openButton = false
  //   }
  //   console.log('after',this.openButton)
  // }

  onShowTha() {
    if (this.showTha === true && this.showEng === true) {
      this.showBtnTha = true;
      this.showEng = false;

    } else if (this.showTha === true && this.showEng === false) {
      this.showBtnTha = false;
      this.showEng = true;

    }
  }

  onShowEng() {
    if (this.showTha === true && this.showEng === true) {
      this.showBtnEng = true;
      this.showTha = false;

    } else if (this.showTha === false && this.showEng === true) {
      this.showBtnEng = false;
      this.showTha = true;

    }
  }


  appvWelcomehome() {
    // const dataSave = {} as modelWelcome;
    // dataSave.receiveWelcomehome = this.checkWelcomehome;
    // dataSave.hyrf_id = this.hyrf_id
    console.log('accept_id' , this.hyrf_id);
    this.MSsrv.AcceptWelcomehome(this.hyrf_id, this.checkWelcomehome).subscribe(resp => {});
    // console.log('success', this.checkWelcomehome);
  }

  getWelcomeMemo() {
    // if (this.welcomehome_stage === 'TransferPromotion') {
    // this.authen.LoginCRM().subscribe(data => {
    //     this.master.getWelcomeMemoAgreement(data.token, this.transfer_id).subscribe(data2 => {
    //       // console.log(data2);
    //       this.dataItem = data2;
    //       this.master.exportTransPromotionPrintFormUrlAsync$(data.token, this.dataItem.agreementID).subscribe(item => {
    //         this.dataItem2 = item;
    //         this.master.openWindowWithPost(this.dataItem2.url, { params: this.dataItem2.params });
    //         this.toasterService.success('Success');
    //       });
    //     });
    // });
    // } else if (this.welcomehome_stage === 'SalePromotion') {
    //   this.authen.LoginCRM().subscribe(data => {
    //     this.master.getWelcomeMemoAgreement(data.token, this.transfer_id).subscribe(data2 => {
    //       // console.log(data2);
    //       this.dataItem = data2;
    //       this.master.exportAgreementPrintFormUrlAsync$(data.token, this.dataItem.agreementID).subscribe(item => {
    //         this.dataItem2 = item;
    //         this.master.openWindowWithPost(this.dataItem2.url, { params: this.dataItem2.params });
    //         this.toasterService.success('Success');
    //       });
    //     });
    //   });
    // }
    
    this.authen.LoginCRM().subscribe(data => {
      this.master.getWelcomeMemoAgreement(data.token, this.transfer_id).subscribe(data2 => {
        // console.log(data2);
        this.dataItem = data2;
        this.master.exportWelcomehomeMemoAsync$(data.token, this.dataItem.agreementID, this.hyrf_id, this.welcomehome_stage).subscribe(item => {
          this.dataItem2 = item;
          this.master.openWindowWithPost(this.dataItem2.url, { params: this.dataItem2.params });
          this.toasterService.success('Success');
        });
      });
  });
  }
}
