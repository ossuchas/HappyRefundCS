import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tf01docstatus'
})
export class Tf01docstatusPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value === 'N') {
            return 'รอการส่งเอกสาร';
        } else if (value === 'Y') {
            return 'รอการตรวจสอบเอกสาร';
        } else if (value === 'P') {
            return 'รอการยืนยันวันที่เงินเข้า';
        } else if (value === 'A') {
            return 'อนุมัติรายการแล้ว';
        } else {
            return 'N/A';
        }
    }
}
