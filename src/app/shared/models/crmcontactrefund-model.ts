export class CrmContactRefund {
    hyrf_id: number;
    productid: string;
    project: string;
    companyid: string;
    unitnumber: string;
    addressnumber: string;
    wbsnumber: string;
    contractnumber: string;
    transfernumber: string;
    transferdateapprove: Date;
    remainingtotalamount: number;
    contactid: string;
    header: boolean;
    personcardid: string;
    namestitle: string;
    firstname: string;
    lastname: string;
    fullname: string;
    coownername: string;
    nationality: string;
    foreigner: string;
    mobile: string;
    email: string;

    tf01_appv_flag:	string;
    tf01_appv_date:	Date;
    tf01_appv_by: string;
    tf01_remarks: string;

    tf02_appv_flag:	string;
    tf02_appv_date:	Date;
    tf02_appv_by: string;
    tf02_remarks: string;

    ac01_appv_flag:	string;
    ac01_appv_date: Date;
    ac01_appv_by: string;
    ac01_remarks: string;

    ac02_appv_flag:	string;
    ac02_appv_date: Date;
    ac02_appv_by: string;
    ac02_remarks: string;
    ac02_due_date: Date;

    email_sent_status: string;
    email_sent_date: Date;
    email_thx_sent_status: string;
    email_thx_sent_date: Date;

    sms_sent_status: string;
    sms_sent_date: Date;
    sms_thx_sent_status: string;
    sms_thx_sent_date: Date;

    doc_sent_status: string;
    doc_sent_date: Date;
    doc_merge_url: string;

    tran_status: string;

    createby: string;
    createdate: Date;
    modifyby: string;
    modifydate: Date;
}
