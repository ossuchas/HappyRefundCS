import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRMMasterBank } from '../models/vw_crm_refund_mst_bank';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CRMBankNameList } from '../models/vw_crm_refund_banknamelst';
import { environment } from 'src/environments/environment';
import { csBankDelt } from '../models/csbankdelt-model';

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

  // getBankMaster(): Observable<CRMMasterBank[]> {
  //   return this.http.get<CRMMasterBank[]>('https://happyrefundapi.apthai.com/api/v1/bankmasterlist');
  // }
  getCSBankDelt(hyrf_id: number): Observable<csBankDelt>{
    return this.http.get<csBankDelt>(this.APIUrl + '/csbankdetl/' + hyrf_id);
  }


  getBankMaster(): Observable<CRMMasterBank[]> {
    return this.http.get<CRMMasterBank[]>(this.APIUrl+'/bankmasterlist');
  }

  getBankAccountName(hyrf_id: number): Observable<CRMBankNameList[]> {
    return this.http.get<CRMBankNameList[]>(this.APIUrl+'/banknamelist/' + hyrf_id);
  }

  getBankBranch(token,bankID): Observable<any>
  {
   var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+token
      })
    };
    var crmmaster = environment.apiCRMMaster;
    return this.http.get(crmmaster+'?bankCode='+bankID,httpOptions);
  }

  deleteImg(token,imgID){
    var  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+token
      })
    };
    var crmrefund= environment.apiCRMRefund;
    return this.http.post(crmrefund + imgID +'/DeleteRefund',{ img_id: imgID},httpOptions);
  }

  bankSubmit(hyrf_id: string, bankcodeInput: string, bankaccountnoInput: string, bankaccountnameInput: string, botbankcodeInput:string, botbankbranchcodeInput: string, botbankbranchnameInput:string): Observable<any> {
    apiUrl: 'https://happyrefundapi.apthai.com/api/v1';
    // return this.http.put<any>('http://happyrefund-api-testrepo.devops-app.apthai.com/api/v1/banksubmit/' + hyrf_id, { bankcode: bankcodeInput, bankaccountno: bankaccountnoInput, bankaccountname: bankaccountnameInput }, this.httpOptions);
    console.log(botbankcodeInput);
    console.log(botbankbranchcodeInput);
    console.log(botbankbranchnameInput);
    return this.http.put<any>(this.APIUrl + '/banksubmit/' + hyrf_id, 
    { bankcode: bankcodeInput, 
      bankaccountno: bankaccountnoInput, 
      bankaccountname: bankaccountnameInput,
      bot_bank_code:botbankcodeInput,
      bot_bank_branch_code: botbankbranchcodeInput, 
      bot_bank_branch_name: botbankbranchnameInput}, this.httpOptions);
  }
}
