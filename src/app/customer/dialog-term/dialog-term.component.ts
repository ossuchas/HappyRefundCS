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

  @Input() welcomehomeAmount: number;
  @Input() refundAmount: number;

  showTha: any;
  showEng: any;

  showBtnTha: any;
  showBtnEng: any;

  checkWelcomehome: boolean;
  welcomehome_flag: string;
  welcomehome_accept_datetime: string;

  openButton = false;
  hyrf_id: number = +localStorage.getItem('_hyrf_id');
  ngOnInit() {

  this.welcomehome_accept_datetime = localStorage.getItem('_welcomehome_accept_date');

  this.welcomehome_flag = localStorage.getItem('_welcomehomeflag');
  this.showTha = true;
  this.showEng = true;

  if (this.welcomehome_accept_datetime === 'null') {
    this.checkWelcomehome = false;
  } else {
    this.checkWelcomehome = true;
  }
  console.log('_welcomehomeflag', this.welcomehome_flag);
  console.log('WelcomehomeAcceptDate', this.welcomehome_accept_datetime);
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
}
