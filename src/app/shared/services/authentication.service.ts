import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  readonly APIUrl = environment.apiCRM;
  readonly ID = environment.clientId;
  readonly Secret = environment.clientSecret;

  helloWorld() {
      console.log('Hello World Authen.');
  }

  LoginCRM():Observable<any>
  {
    return this.http.post(this.APIUrl, { client_id: this.ID, client_secret: this.Secret}, this.httpOptions);
  }

}
