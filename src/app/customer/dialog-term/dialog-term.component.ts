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
  tabpage = false
  onClick(){

    
    // if(this.tabpage = false){
      this.tabpage = true
    // }
    // else{
    //   this.tabpage = false
    // }
  }
}
