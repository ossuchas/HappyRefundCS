import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tf01docstatus'
})
export class Tf01docstatusPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value === 'N') {
            return 'รอการส่งเอกสาร/Waiting for documents to be sent';
        } else if (value === 'Y') {
            return 'รอการตรวจสอบเอกสาร/Considering documents';
        } else if (value === 'R') {
            return 'เอกสารไม่ถูกต้องกรุณาส่งเอกสารใหม่/Invalid document, please submit new document.';
        } else if (value === 'P') {
            return 'รอการยืนยันวันที่เงินเข้า/Wait for confirmation of the deposit date';
        } else if (value === 'A') {
            return 'APPROVED';
        } else {
            return 'N/A';
        }
    }
}
