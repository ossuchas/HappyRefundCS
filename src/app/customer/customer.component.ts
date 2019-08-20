import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadService, CustomerService } from '../shared';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    isValidate = false;

    constructor(private srvUpload: UploadService, private srvCS: CustomerService, private snackBar: MatSnackBar) {}

    ngOnInit() {}

    validate(form: NgForm) {
        console.log(form.value);

        this.srvCS.checkPersonalId(form.value.personalid).subscribe(
            res => {
                this.isValidate = true;
                console.log(res);
            },
            error => {
                this.isValidate = false;
                console.log(error);
                this.snackBar.open(error.error['message'], '', {
                    duration: 5000
                });
            }
        );
    }

    upload(form: NgForm) {
        console.log(form.value);
        this.srvUpload.helloWorld();
    }
}
