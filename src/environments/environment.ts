// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import { config } from '../../config';
// import process = require('process');
// import { process } from 'process';
// import { config } from 'config';

export const environment = {
  production: false,
  apiUrl: 'http://happyrefund-api-testrepo.devops-app.apthai.com/api/v1',
  apiCRM: 'http://crmrevo-identity-api-crmrevo-dev.devops-app.apthai.com/api/Token/ClientLogin',
  apiCRMMaster: 'http://crmrevo-masterdata-api-crmrevo-dev.devops-app.apthai.com/api/MasterCenters/BankBranchBOTDropdownList',
  apiCRMRefund: 'http://crmrevo-refund-api-crmrevo-dev.devops-app.apthai.com/api/Refund/',
  apiCRMTransferPromotion: 'http://crmrevo-promotion-api-crmrevo-dev.devops-app.apthai.com/api/TransferPromotions/',
  apiCRMSalePromotion: 'http://crmrevo-sale-api-crmrevo-dev.devops-app.apthai.com/api/Agreement/',
  clientId: 'crmdigital',
  clientSecret: 'pVcySkP6M2QFYvJm5h7fCjSQPoJkUIOmA1OBqZebj4orj8OX6E1U4xViZTu7VBxGKXcvmEiyipm7PO8HQfNPqZGv6v6WTQ',

// ============================Old Url//============================//
  // apiUrl: 'http://192.168.0.42:5000/api/v1'
  // apiUrl: 'http://192.168.4.11:5000/api/v1'
  // apiUrl: 'http://localhost:5000/api/v1'
  // apiUrl: 'https://happyrefundapi.apthai.com/api/v1'
  // apiUrl: 'http://localhost:5000/api/v1'
  // apiUrl: 'http://happyrefundapi-happyrefunds.devops-app.apthai.com/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
