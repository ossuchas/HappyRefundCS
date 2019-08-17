import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthenticationService } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
      public router: Router,
      private service: AuthenticationService
    ) {}

    ngOnInit() {}

    onLoggedin() {
        this.service.helloWorld();
        localStorage.setItem('isLoggedin', 'true');
    }
}
