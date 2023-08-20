import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { CustomerDto } from '../../shared/models/customer/customer-dto';
import { CustomerService } from '../../shared/services/customer/customer.service';

@Component({
  selector: 'app-add-customer-popup',
  templateUrl: './add-customer-popup.component.html',
  styleUrls: ['./add-customer-popup.component.scss'],
})
export class AddCustomerPopupComponent {
  customer: CustomerDto = {
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date().toJSON().split('T')[0],
  };
  customerForm!: FormGroup;
  isPageLoaded: boolean = false;

  constructor(
    public fb: FormBuilder,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<AddCustomerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public customerId: number = 0
  ) {
    this.customer.id = customerId;
  }

  ngOnInit(): void {
    this.GetCustomer();
  }

  /* Get Customer */
  GetCustomer() {
    if (this.customerId > 0) {
      firstValueFrom(this.customerService.GetCustomer(this.customerId))
        .then((data) => {
          this.customer = data;
          if (
            this.customer &&
            Array.isArray(this.customer.birthDate) &&
            this.customer.birthDate.length > 0
          ) {
            this.customer.birthDate =
              this.customer.birthDate[0] +
              '/' +
              this.customer.birthDate[1] +
              '/' +
              this.customer.birthDate[2];
          }
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
    this.customerForm = this.fb.group({
      firstName: [this.customer.firstName, [Validators.required]],
      lastName: [this.customer.lastName, [Validators.required]],
      birthDate: [new Date(this.customer.birthDate), [Validators.required]],
    });
    this.isPageLoaded = true;
  }

  /* Error Handling */
  public errorHandling = (control: string, error: string) => {
    return this.customerForm.controls[control].hasError(error);
  };

  /* Save Customer */
  saveCustomer() {
    if (!this.customerForm.invalid) {
      let model: CustomerDto = { ...this.customerForm.value };
      let date = new Date(model.birthDate);
      model.birthDate =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        date.getDate().toString().padStart(2, '0');

      if (this.customer.id > 0) {
        firstValueFrom(
          this.customerService.UpdateCustomer(model, this.customerId)
        )
          .then((result: any) => {
            this.toastrService.success(
              "Customer's record updated successfully"
            );
            this.dialogRef.close(result);
          })
          .catch((error) => {
            this.toastrService.error('An error occured!');
            throw error;
          });
      } else {
        firstValueFrom(
          this.customerService.AddCustomer(this.customerForm.value)
        )
          .then((result: any) => {
            this.toastrService.success("Customer's record added successfully");
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
