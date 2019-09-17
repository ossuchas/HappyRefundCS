import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User, CrmContactRefund } from '../models';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    formData: CrmContactRefund;

    // Base url
    readonly APIUrl = environment.apiUrl;

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private _listeners = new Subject<any>();

    helloWorld() {
        console.log('Hello World Authen.');
    }

    // POST
    // login(_username: string, _password: string) {
    //     return this.http.post<User>(this.APIUrl + '/login', { username: _username, password: _password }, this.httpOptions).pipe(
    //         map(user => {
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             return user;
    //         })
    //     );
    // }

    // PUT
    sendDocRefund(_hyrf_id: string): Observable<CrmContactRefund> {
        return this.http.put<CrmContactRefund>(this.APIUrl + '/senddoc/' + _hyrf_id, { doc_sent_status: 'Y'}, this.httpOptions).pipe(
            retry(1),
            catchError(this.errorHandl)
        );
    }

    checkPersonalId(_personal_id: string): Observable<CrmContactRefund[]> {
        console.log('Check Personal ID' + _personal_id);
        console.log('Check Personal ID' + this.APIUrl);
        return this.http.get<CrmContactRefund[]>(this.APIUrl + '/checkpersonalid/' + _personal_id);
    }

    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
    listen(): Observable<any> {
        return this._listeners.asObservable();
    }
    filter(filterBy: string) {
        this._listeners.next(filterBy);
    }
}
