import { TestBed } from '@angular/core/testing';

import { CrmContactRefundListImgUrlService } from './vw_crm_refund_docref.service';

describe('CrmContactRefundListImgUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrmContactRefundListImgUrlService = TestBed.get(CrmContactRefundListImgUrlService);
    expect(service).toBeTruthy();
  });
});
