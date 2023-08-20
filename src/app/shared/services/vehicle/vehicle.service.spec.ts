import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  PageRequestDto,
  sortEnum,
} from '../../models/page-request/page-request-dto';
import { VehicleDto } from '../../models/vehicle/vehicle-dto';

import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /* Get vehicle */
  it('Get Vehicle List', waitForAsync(async () => {
    let pageRequestDto: PageRequestDto = {
      page: 0,
      size: 10,
      sort: sortEnum.UNSORTED,
    };
    service.GetVehiclePageList(pageRequestDto).subscribe((result) => {
      expect(result.numberOfItems).toBeGreaterThanOrEqual(0);
    });
  }));
  /* Add vehicle */
  it('Add Vehicle', waitForAsync(async () => {
    let vehicle: VehicleDto = {
      id: 0,
      brand: 'BMW',
      model: 'X3',
      modelYear: 2022,
      price: 45000,
    };
    service.AddVehicle(vehicle).subscribe((result) => {
      expect(result.id).toBeGreaterThanOrEqual(1);
    });
  }));
});
