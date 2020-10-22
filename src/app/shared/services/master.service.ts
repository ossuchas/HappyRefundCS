import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRMMasterBank } from '../models/vw_crm_refund_mst_bank';
import { HttpClient } from '@angular/common/http';
import { CRMBankNameList } from '../models/vw_crm_refund_banknamelst';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getBankMaster(): Observable<CRMMasterBank[]> {
    return this.http.get<CRMMasterBank[]>('https://happyrefundapi.apthai.com/api/v1/bankmasterlist');
  }

  getBankAccountName(hyrf_id: number): Observable<CRMBankNameList[]> {
    return this.http.get<CRMBankNameList[]>('https://happyrefundapi.apthai.com/api/v1/banknamelist/' + hyrf_id);
  }
}
