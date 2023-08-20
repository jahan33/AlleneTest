import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractDto } from '../../shared/models/contract/contract-overview-dto';
import { CustomerDto } from '../../shared/models/customer/customer-dto';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import {
  PageRequestDto,
  sortEnum,
} from '../../shared/models/page-request/page-request-dto';
import { VehicleDto } from '../../shared/models/vehicle/vehicle-dto';
import { ContractService } from '../../shared/services/contract/contract.service';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddContractComponent implements OnInit {
  contractForm!: FormGroup;
  customerForm!: FormGroup;
  vehicleForm!: FormGroup;
  contractDto: ContractDto = { id: 0 };
  contractId: number = 0;
  isPageLoaded: boolean = false;
  customerEditMode: boolean = false;
  vehicleEditMode: boolean = false;
  totalContract: number = 0;

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams?.subscribe((params: Params) => {
      if (params['id'] != null && params['id'] != undefined) {
        this.contractId = Number.parseInt(params['id']);
        if (isNaN(this.contractId)) {
          this.contractId = 0;
        }
      }
      if (params['t'] != null && params['t'] != undefined) {
        this.totalContract = Number.parseInt(params['t']);
        if (isNaN(this.totalContract)) {
          this.totalContract = 0;
        }
      }
    });
  }
  ngOnInit(): void {
    this.GetContract();
  }
  /* Get Contract Detail */
  GetContract() {
    if (this.contractId > 0) {
      this.contractService.GetContract(this.contractId).subscribe((s) => {
        this.contractDto = s;

        this.initFormControls();
      });
    } else {
      this.initFormControls();
    }
  }

  /* Set Customer Mode */
  SetCustomerMode(isBack: boolean, stepper?: MatStepper) {
    if (
      this.contractDto != undefined &&
      this.contractDto.customer != undefined &&
      this.contractDto.customer?.id > 0
    ) {
      this.customerEditMode = false;
    } else {
      if (isBack == true) {
        stepper?.previous();
      } else {
        this.customerEditMode = true;
      }
    }
  }

  /* Set Vehicle Mode */
  SetVehicleMode(isBack: boolean, stepper?: MatStepper) {
    if (
      this.contractDto != undefined &&
      this.contractDto.vehicle != undefined &&
      this.contractDto.vehicle?.id > 0
    ) {
      this.vehicleEditMode = false;
    } else {
      if (isBack == true) {
        stepper?.previous();
      } else {
        this.vehicleEditMode = true;
      }
    }
  }

  /* Init Form Controls */
  initFormControls() {
    this.contractForm = this.fb.group({
      id: [this.contractDto?.id],
      monthlyRate: [this.contractDto?.monthlyRate, [Validators.required]],
    });

    if (
      this.contractDto != undefined &&
      this.contractDto.customer != undefined
    ) {
      if (Array.isArray(this.contractDto?.customer?.birthDate)) {
        let birthDate = this.contractDto?.customer?.birthDate;
        if (birthDate) {
          this.contractDto.customer.birthDate =
            birthDate[0].toString().padStart(2, '0') +
            '-' +
            birthDate[1].toString().padStart(2, '0') +
            '-' +
            birthDate[2].toString().padStart(2, '0');
        }
      }
    }

    this.customerForm = this.fb.group({
      id: [this.contractDto?.customer?.id, [Validators.required]],
      firstName: [this.contractDto?.customer?.firstName, [Validators.required]],
      lastName: [this.contractDto?.customer?.lastName, [Validators.required]],
      birthDate: [this.contractDto?.customer?.birthDate],
    });

    this.vehicleForm = this.fb.group({
      id: [this.contractDto?.vehicle?.id, [Validators.required]],
      brand: [this.contractDto?.vehicle?.brand, [Validators.required]],
      model: [this.contractDto?.vehicle?.model, [Validators.required]],
      modelYear: [this.contractDto?.vehicle?.modelYear, [Validators.required]],
      price: [this.contractDto?.vehicle?.price, [Validators.required]],
      vin: [this.contractDto?.vehicle?.vin],
    });
    this.isPageLoaded = true;
    this.SetCustomerMode(false);
    this.SetVehicleMode(false);
  }
  /* On Delete Customer */
  OnDeleteCustomer() {
    Swal.fire({
      title: 'Are you sure?',
      text: `you want to remove the customer:${this.contractDto.customer?.firstName} ${this.contractDto.customer?.lastName} from contract!`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.contractDto.customer = undefined;
        this.customerForm.controls['id'].setValue(null);
        this.customerForm.controls['firstName'].setValue(null);
        this.customerForm.controls['lastName'].setValue(null);
        this.customerForm.controls['birthDate'].setValue(null);
        this.SetCustomerMode(false);
      }
    });
  }
  /* On Add Customer */
  OnAddCustomer(customerDto: CustomerDto) {
    if (customerDto) {
      this.contractDto.customer = customerDto;
      this.customerForm.controls['id'].setValue(customerDto.id);
      this.customerForm.controls['firstName'].setValue(customerDto.firstName);
      this.customerForm.controls['lastName'].setValue(customerDto.lastName);
      if (Array.isArray(customerDto.birthDate)) {
        this.customerForm.controls['birthDate'].setValue(
          customerDto.birthDate[0].toString().padStart(2, '0') +
            '-' +
            customerDto.birthDate[1].toString().padStart(2, '0') +
            '-' +
            customerDto.birthDate[2].toString().padStart(2, '0')
        );
      } else {
        this.customerForm.controls['birthDate'].setValue(customerDto.birthDate);
      }
    }
    this.SetCustomerMode(false);
  }
  /* On Delete Vehicle */
  OnDeleteVehicle() {
    Swal.fire({
      title: 'Are you sure?',
      text: `you want to remove the vehicle: ${this.contractDto.vehicle?.brand} ${this.contractDto.vehicle?.model}(${this.contractDto.vehicle?.modelYear}) from contract!`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.contractDto.vehicle = undefined;
        this.vehicleForm.controls['id'].setValue(null);
        this.vehicleForm.controls['brand'].setValue(null);
        this.vehicleForm.controls['model'].setValue(null);
        this.vehicleForm.controls['modelYear'].setValue(null);
        this.vehicleForm.controls['price'].setValue(null);
        this.vehicleForm.controls['vin'].setValue(null);
        this.SetVehicleMode(false);
      }
    });
  }
  /* On Add Vehicle */
  SetVehicleValue(vehicleDto: VehicleDto) {
    this.contractDto.vehicle = vehicleDto;
    this.vehicleForm.controls['id'].setValue(vehicleDto.id);
    this.vehicleForm.controls['brand'].setValue(vehicleDto.brand);
    this.vehicleForm.controls['model'].setValue(vehicleDto.model);
    this.vehicleForm.controls['modelYear'].setValue(vehicleDto.modelYear);
    this.vehicleForm.controls['price'].setValue(vehicleDto.price);
    this.vehicleForm.controls['vin'].setValue(vehicleDto.vin);
    this.SetVehicleMode(false);
  }
  OnAddVehicle(vehicleDto: VehicleDto) {
    if (vehicleDto) {
      if (
        this.totalContract > 0 &&
        this.contractDto?.vehicle?.id != vehicleDto.id
      ) {
        /*
        Limitation: There is no endpoint to filter the contract overview list by vehicle information.
        Workaround: I get the contract overview list, and verify if vehicle already
                    associated with another contract. 
        */
        let pageRequest: PageRequestDto = {
          page: 0,
          size: this.totalContract,
          sort: sortEnum.ASC,
        };
        this.contractService
          .GetContractPageList(pageRequest)
          .subscribe((result) => {
            if (
              !result.overviewItems.find(
                (x) =>
                  x.contractId != this.contractId &&
                  x.vehicleId == vehicleDto.id
              )
            ) {
              this.SetVehicleValue(vehicleDto);
            } else {
              this.toastrService.error(
                'This vehicle is already associated with another contract.'
              );
              this.vehicleEditMode = true;
            }
          });
      } else {
        this.SetVehicleValue(vehicleDto);
      }
    } else {
      this.SetVehicleMode(false);
    }
  }
  /* Error Handling */
  public errorHandling = (
    formGroup: FormGroup,
    control: string,
    error: string
  ) => {
    return formGroup.controls[control].hasError(error);
  };

  /* Move to next step */
  MoveNext(formGroup: FormGroup, stepper: MatStepper) {
    if (!formGroup.invalid) {
      stepper.next();
    }
  }

  /* On Save Contract */
  SaveContract() {
    if (
      !this.contractForm.invalid &&
      !this.customerForm.invalid &&
      !this.vehicleForm.invalid
    ) {
      let contractModel: ContractDto = this.contractForm.value;
      contractModel.customer = this.customerForm.value;
      contractModel.vehicle = this.vehicleForm.value;
      if (this.contractId > 0) {
        this.contractService
          .UpdateContract(contractModel, this.contractId)
          .subscribe((s) => {
            this.toastrService.success('Contract updated successfully!');
            this.router.navigate(['/contract']);
          });
      } else {
        this.contractService.AddContract(contractModel).subscribe((s) => {
          this.toastrService.success('Contract added successfully!');
          this.router.navigate(['/contract']);
        });
      }
    } else {
      this.toastrService.error('Please enter the required fields!');
    }
  }
}
