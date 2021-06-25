import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-term',
  templateUrl: './dialog-term.component.html',
  styleUrls: ['./dialog-term.component.scss']
})
export class DialogTermComponent implements OnInit {

  constructor() { }
  showTha:any;
  showEng:any;
  ngOnInit() {
  this.showTha = true;
  this.showEng = true;
  }

  openButton = false;

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
  
  onShowTha(){
    if(this.showTha === true && this.showEng === true)
    {
      this.showEng = false;
    }
    else if (this.showTha === true && this.showEng === false)
    {
      this.showEng = true;
    }
  }
  onShowEng(){
    if(this.showTha === true && this.showEng === true)
    {
      this.showTha = false;
    }
    else if (this.showTha === false && this.showEng === true)
    {
      this.showTha = true;
    }
  }
}
