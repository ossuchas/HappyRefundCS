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
  getCSBankDelt(hyrf_id: number): Observable<csBankDelt> {
    return this.http.get<csBankDelt>(this.APIUrl + '/csbankdetl/' + hyrf_id);
  }


  getBankMaster(): Observable<CRMMasterBank[]> {
    return this.http.get<CRMMasterBank[]>(this.APIUrl + '/bankmasterlist');
  }

  getBankAccountName(hyrf_id: number): Observable<CRMBankNameList[]> {
    return this.http.get<CRMBankNameList[]>(this.APIUrl + '/banknamelist/' + hyrf_id);
  }

  getBankBranch(token, bankID): Observable<any> {
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      })
    };
    const crmmaster = environment.apiCRMMaster;
    return this.http.get(crmmaster + '?bankCode=' + bankID, httpOptions);
  }

  deleteImg(token, imgID) {
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      })
    };
    const crmrefund = environment.apiCRMRefund;
    return this.http.post(crmrefund + imgID + '/DeleteRefund', { img_id: imgID}, httpOptions);
  }

  getWelcomeMemo(token, trandferID) {
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      })
    };
    const crmrefund = environment.apiCRMRefund;
    return this.http.post(crmrefund + 'GetAgreement', { transferID: trandferID}, httpOptions);
  }

  exportTransPromotionPrintFormUrlAsync$(token, agreementID) {
    const  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      })
    };
    const crmtransferPromotion = environment.apiCRMTransferPromotion;
    return this.http.post(crmtransferPromotion + 'ExportTransPromotionPrintFormUrl', { agreementID: agreementID}, httpOptions);
  }

  openWindowWithPost(url, data) {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        const form = document.createElement('form');
        form.target = '_blank';
        form.method = 'POST';
        form.action = url;
        form.style.display = 'none';

        for (const key in data) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        resolve(true);
      }, 2000);
    });
  }


  bankSubmit(hyrf_id: string, bankcodeInput: string, bankaccountnoInput: string, bankaccountnameInput: string, botbankcodeInput: string, botbankbranchcodeInput: string, botbankbranchnameInput: string): Observable<any> {
    apiUrl: 'https://happyrefundapi.apthai.com/api/v1';
    // return this.http.put<any>('http://happyrefund-api-testrepo.devops-app.apthai.com/api/v1/banksubmit/' + hyrf_id, { bankcode: bankcodeInput, bankaccountno: bankaccountnoInput, bankaccountname: bankaccountnameInput }, this.httpOptions);
    return this.http.put<any>(this.APIUrl + '/banksubmit/' + hyrf_id,
    { bankcode: bankcodeInput,
      bankaccountno: bankaccountnoInput,
      bankaccountname: bankaccountnameInput,
      bot_bank_code: botbankcodeInput,
      bot_bank_branch_code: botbankbranchcodeInput,
      bot_bank_branch_name: botbankbranchnameInput}, this.httpOptions);
  }

  AcceptWelcomehome(hyrf_id: number , _receiveWelcomehome: boolean): Observable<any> {
    return this.http.put<any>(this.APIUrl + '/acceptwelcome/' + hyrf_id, {receiveWelcomehome: _receiveWelcomehome}, this.httpOptions);
}
}
