import { Component, Input, OnInit } from '@angular/core';
import { MasterService } from 'src/app/shared';
// export interface modelWelcome {
//   hyrf_id: number;
//   receiveWelcomehome: boolean;
// }
@Component({
  selector: 'app-dialog-term',
  templateUrl: './dialog-term.component.html',
  styleUrls: ['./dialog-term.component.scss']
})


export class DialogTermComponent implements OnInit {

  constructor(
    private MSsrv: MasterService,
  ) { }

  @Input() welcomeHomeFlag: string;
  @Input() welcomeHomeAcceptDatetime: Date;
  @Input() hyrf_id: number;
  @Input() welcomehomeAmount: number;
  @Input() refundAmount: number;

  showTha: any;
  showEng: any;

  showBtnTha: any;
  showBtnEng: any;

  checkWelcomehome: boolean;


  openButton = false;

  ngOnInit() {
  this.showTha = true;
  this.showEng = true;

  if (this.welcomeHomeAcceptDatetime === null) {
    this.checkWelcomehome = false;
  } else {
    this.checkWelcomehome = true;
  }

  console.log('testttttttt', this.welcomeHomeFlag);
  console.log('testttttttt', this.welcomeHomeAcceptDatetime);
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
    this.MSsrv.AcceptWelcomehome(this.hyrf_id, this.checkWelcomehome).subscribe(resp => {});
    // console.log('success', this.checkWelcomehome);
  }

  appvWelcomehomeOnly() {
    // const dataSave = {} as modelWelcome;
    // dataSave.receiveWelcomehome = this.checkWelcomehome;
    // dataSave.hyrf_id = this.hyrf_id
    this.MSsrv.AcceptWelcomehome(this.hyrf_id, this.checkWelcomehome).subscribe(resp => {});
    // console.log('success', this.checkWelcomehome);
  }
}
