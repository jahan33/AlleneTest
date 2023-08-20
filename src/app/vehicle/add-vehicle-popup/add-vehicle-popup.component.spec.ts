import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { VehicleDto } from '../../shared/models/vehicle/vehicle-dto';
import { VehicleService } from '../../shared/services/vehicle/vehicle.service';
import { SharedModule } from '../../shared/shared.module';

import { AddVehiclePopupComponent } from './add-vehicle-popup.component';

describe('AddVehiclePopupComponent', () => {
  let component: AddVehiclePopupComponent;
  let fixture: ComponentFixture<AddVehiclePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        SweetAlert2Module.forRoot(),
        BrowserAnimationsModule,
      ],
      declarations: [AddVehiclePopupComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(AddVehiclePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
