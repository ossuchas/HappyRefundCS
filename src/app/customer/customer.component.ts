import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService } from '../shared';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    isValidate = false;

    constructor(
        private srvUpload: UploadService
    ) {
    }

    ngOnInit() {}

    validate(form: NgForm) {
        console.log(form.value);
        // alert('Your Persona ID is : ' + form.value.personalid);
        this.isValidate = true;
    }

    upload(form: NgForm) {
        console.log(form.value);
        this.srvUpload.helloWorld();
    }
}
