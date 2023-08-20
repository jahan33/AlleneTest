import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { BrandService } from './brand.service';

describe('BrandService', () => {
  let service: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Get Brand List', waitForAsync(async () => {
    service.GetBrand().subscribe((result) => {
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  }));

  it('Get Brand Model List', waitForAsync(async () => {
    service.GetBrand().subscribe((brand) => {
      service.GetBrandsModel(brand[0].id).subscribe((result) => {
        expect(result.length).toBeGreaterThanOrEqual(0);
      });
    });
  }));
});
