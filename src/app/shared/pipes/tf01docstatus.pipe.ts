import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tf01docstatus'
})
export class Tf01docstatusPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value === 'N') {
            return 'รอการส่งเอกสาร/Waiting for documents submitted';
        } else if (value === 'Y') {
            return 'รอการตรวจสอบเอกสาร/Verifying documents';
        } else if (value === 'R') {
            return 'เอกสารไม่ถูกต้อง กรุณาส่งเอกสารใหม่/Invalid documents, please resubmit new documents.';
        } else if (value === 'P') {
            return 'รอการยืนยันวันที่เงินเข้า/Waiting for confirming deposit date';
        } else if (value === 'A') {
            return 'APPROVED: เงินเข้าภายในวันที่/Money arrived within ';
        } else {
            return 'N/A';
        }
    }
}