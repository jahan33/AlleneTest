import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import {
  PageRequestDto,
  sortEnum,
} from '../../shared/models/page-request/page-request-dto';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { SharedModule } from '../../shared/shared.module';

import { ViewCustomerComponent } from './view-customer.component';

describe('ViewCustomerComponent', () => {
  let component: ViewCustomerComponent;
  let fixture: ComponentFixture<ViewCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ToastrModule.forRoot(),
        SweetAlert2Module.forRoot(),
        HttpClientModule,
      ],
      declarations: [ViewCustomerComponent],
    });
    fixture = TestBed.createComponent(ViewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Get Customer List', waitForAsync(
    inject([CustomerService], (customerService: CustomerService) => {
      let pageRequestDto: PageRequestDto = {
        page: 0,
        size: 10,
        sort: sortEnum.UNSORTED,
      };
      customerService
        .GetCustomerPageList(pageRequestDto)
        .subscribe((result) => {
          expect(result.numberOfItems).toBeGreaterThanOrEqual(0);
        });
    })
  ));
});
