import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  PageRequestDto,
  sortEnum,
} from '../../models/page-request/page-request-dto';

import { ContractService } from './contract.service';

describe('ContractService', () => {
  let service: ContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Get Contract List', waitForAsync(async () => {
    let pageRequestDto: PageRequestDto = {
      page: 0,
      size: 10,
      sort: sortEnum.UNSORTED,
    };
    service.GetContractPageList(pageRequestDto).subscribe((result) => {
      expect(result.numberOfItems).toBeGreaterThanOrEqual(0);
    });
  }));
});
