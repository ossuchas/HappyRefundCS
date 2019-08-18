import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService, CustomerService } from '../shared';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    isValidate = false;

    constructor(private srvUpload: UploadService, private srvCS: CustomerService) {}

    ngOnInit() {}

    validate(form: NgForm) {
        console.log(form.value);
        // alert('Your Persona ID is : ' + form.value.personalid);
        this.isValidate = true;

        this.srvCS.checkPersonalId(form.value.personalid).subscribe(
            res => {
                console.log(res);
                alert('success');
            },
            error => {
                console.log('ERROR KAI');
                alert('error');
            }
        );
    }

    upload(form: NgForm) {
        console.log(form.value);
        this.srvUpload.helloWorld();
    }
}
