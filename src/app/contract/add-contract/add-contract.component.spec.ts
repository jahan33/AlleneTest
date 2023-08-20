import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomerModule } from '../../customer/customer.module';
import { ContractDto } from '../../shared/models/contract/contract-overview-dto';
import { ContractService } from '../../shared/services/contract/contract.service';
import { SharedModule } from '../../shared/shared.module';
import { VehicleModule } from '../../vehicle/vehicle.module';

import { AddContractComponent } from './add-contract.component';

describe('AddContractComponent', () => {
  let component: AddContractComponent;
  let fixture: ComponentFixture<AddContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        SweetAlert2Module.forRoot(),
        CustomerModule,
        VehicleModule,
      ],
      declarations: [AddContractComponent],
      providers: [
        ContractService,
        ToastrService,
        { provide: ActivatedRoute, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(AddContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
