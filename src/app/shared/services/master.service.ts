import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRMMasterBank } from '../models/vw_crm_refund_mst_bank';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CRMBankNameList } from '../models/vw_crm_refund_banknamelst';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class MasterService {

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  readonly APIUrl = environment.apiUrl;

  getBankMaster(): Observable<CRMMasterBank[]> {
    return this.http.get<CRMMasterBank[]>('https://happyrefundapi.apthai.com/api/v1/bankmasterlist');
  }

  getBankAccountName(hyrf_id: number): Observable<CRMBankNameList[]> {
    return this.http.get<CRMBankNameList[]>('https://happyrefundapi.apthai.com/api/v1/banknamelist/' + hyrf_id);
  }

  bankSubmit(hyrf_id: string, bankcodeInput: string, bankaccountnoInput: string, bankaccountnameInput: string): Observable<any> {
    apiUrl: 'https://happyrefundapi.apthai.com/api/v1';
    // return this.http.put<any>('http://happyrefund-api-testrepo.devops-app.apthai.com/api/v1/banksubmit/' + hyrf_id, { bankcode: bankcodeInput, bankaccountno: bankaccountnoInput, bankaccountname: bankaccountnameInput }, this.httpOptions);
    return this.http.put<any>(this.APIUrl + '/banksubmit/' + hyrf_id, { bankcode: bankcodeInput, bankaccountno: bankaccountnoInput, bankaccountname: bankaccountnameInput }, this.httpOptions);
  }

}
