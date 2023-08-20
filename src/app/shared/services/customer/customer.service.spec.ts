import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CustomerDto } from '../../models/customer/customer-dto';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Add Customer', waitForAsync(async () => {
    let customer: CustomerDto = {
      id: 0,
      firstName: 'Jahangir',
      lastName: 'Javed',
      birthDate: '2001-09-21',
    };
    service.AddCustomer(customer).subscribe((result) => {
      expect(result.id).toBeGreaterThanOrEqual(1);
    });
  }));
});
