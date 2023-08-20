import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  PageRequestDto,
  sortEnum,
} from '../../shared/models/page-request/page-request-dto';
import { ContractService } from '../../shared/services/contract/contract.service';
import { SharedModule } from '../../shared/shared.module';

import { ContractOverviewComponent } from './contract-overview.component';

describe('ContractOverviewComponent', () => {
  let component: ContractOverviewComponent;
  let fixture: ComponentFixture<ContractOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        SweetAlert2Module.forRoot(),
      ],
      declarations: [ContractOverviewComponent],
      providers: [ContractService, ToastrService],
    });
    fixture = TestBed.createComponent(ContractOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Get Contract List', waitForAsync(
    inject([ContractService], (contractService: ContractService) => {
      let pageRequestDto: PageRequestDto = {
        page: 0,
        size: 10,
        sort: sortEnum.UNSORTED,
      };
      contractService
        .GetContractPageList(pageRequestDto)
        .subscribe((result) => {
          expect(result.numberOfItems).toBeGreaterThanOrEqual(0);
        });
    })
  ));
});
