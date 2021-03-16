import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-term',
  templateUrl: './dialog-term.component.html',
  styleUrls: ['./dialog-term.component.scss']
})
export class DialogTermComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openButton = false;

  onClick(){
    console.log('before',this.openButton)
    if(this.openButton === false){
      this.openButton = true
    }
    else {
      this.openButton = false
    }
    console.log('after',this.openButton)
  }
}
