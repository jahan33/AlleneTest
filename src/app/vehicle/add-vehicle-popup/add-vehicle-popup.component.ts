import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import {
  BrandDto,
  BrandModelDto,
} from '../../shared/models/brand-model/brand-dto';
import { VehicleDto } from '../../shared/models/vehicle/vehicle-dto';
import { BrandService } from '../../shared/services/brand-model/brand.service';
import { VehicleService } from '../../shared/services/vehicle/vehicle.service';
@Component({
  selector: 'app-add-vehicle-popup',
  templateUrl: './add-vehicle-popup.component.html',
  styleUrls: ['./add-vehicle-popup.component.scss'],
})
export class AddVehiclePopupComponent {
  vehicle: VehicleDto = { id: 0, brand: '', model: '', vin: '' };
  vehicleForm!: FormGroup;
  isPageLoaded: boolean = false;
  brandList?: BrandDto[];
  brands?: BrandDto[];
  modelList?: BrandModelDto[];
  models?: BrandModelDto[];
  constructor(
    public fb: FormBuilder,
    private vehicleService: VehicleService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private dialogRef: MatDialogRef<AddVehiclePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicleId: number = 0
  ) {
    this.vehicle.id = vehicleId;
  }

  ngOnInit(): void {
    this.GetVehicle();
  }
  /* Get Brands */
  GetBrands() {
    this.brandService.GetBrand().subscribe((result) => {
      this.brandList = result;
      this.brands = result;
      this.GetModels();
    });
  }
  /* Search Brand */
  SearchBrand() {
    this.vehicleForm.controls['brandSearch'].valueChanges.subscribe(
      (data: any) => {
        this.brandList = this.brands?.filter((x) =>
          x.name?.toLowerCase().trim().includes(data.toLowerCase())
        );
      }
    );
  }
  /* Get Model */
  GetModels() {
    let brandName: string = this.vehicleForm.controls['brand'].value;
    let selectedBrand = this.brands?.filter((x) => x.name == brandName);
    if (selectedBrand != undefined && selectedBrand.length > 0) {
      this.brandService
        .GetBrandsModel(selectedBrand[0].id)
        .subscribe((result) => {
          this.modelList = result;
          this.models = result;
        });
    }
  }
  /* Search Model */
  SearchModel() {
    this.vehicleForm.controls['modelSearch'].valueChanges.subscribe(
      (data: any) => {
        this.modelList = this.models?.filter((x) =>
          x.name?.toLowerCase().trim().includes(data.toLowerCase())
        );
      }
    );
  }

  /* Get Vehicle */
  GetVehicle() {
    if (this.vehicleId > 0) {
      firstValueFrom(this.vehicleService.GetVehicle(this.vehicleId))
        .then((data) => {
          this.vehicle = data;
          this.initFormControls();
        })
        .catch((error) => {
          throw error;
        });
    } else {
      this.initFormControls();
    }
  }

  /* Init Form Controls */
  initFormControls() {
    this.vehicleForm = this.fb.group({
      brand: [this.vehicle.brand, [Validators.required]],
      model: [this.vehicle.model, [Validators.required]],
      modelYear: [this.vehicle.modelYear, [Validators.required]],
      price: [this.vehicle.price, [Validators.required]],
      vin: [this.vehicle.vin],
      brandSearch: [''],
      modelSearch: [''],
    });
    this.GetBrands();
    this.isPageLoaded = true;
    this.SearchBrand();
    this.SearchModel();
  }

  /* Error Handling */
  public errorHandling = (control: string, error: string) => {
    return this.vehicleForm.controls[control].hasError(error);
  };

  /* Save Vehicle */
  saveVehicle() {
    if (!this.vehicleForm.invalid) {
      if (this.vehicleId > 0) {
        firstValueFrom(
          this.vehicleService.UpdateVehicle(
            this.vehicleForm.value,
            this.vehicleId
          )
        )
          .then((result: any) => {
            this.toastrService.success("Vehicle's record updated successfully");
            this.dialogRef.close(result);
          })
          .catch((error) => {
            this.toastrService.error('An error occured!');
            throw error;
          });
      } else {
        firstValueFrom(this.vehicleService.AddVehicle(this.vehicleForm.value))
          .then((result: any) => {
            this.toastrService.success("Vehicle's record added successfully");
            this.dialogRef.close(result);
          })
          .catch((error) => {
            this.toastrService.error('An error occured!');
            throw error;
          });
      }
    } else {
      this.toastrService.error('Please enter the required fields!');
    }
  }
}
