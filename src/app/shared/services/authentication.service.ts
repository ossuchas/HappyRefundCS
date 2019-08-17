import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  helloWorld() {
      console.log('Hello World Authen.');
  }
}
