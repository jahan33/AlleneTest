import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { catchError, firstValueFrom, tap } from 'rxjs';
import { CustomerDto } from '../../shared/models/customer/customer-dto';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerPopupComponent } from '../add-customer-popup/add-customer-popup.component';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {
  PageRequestDto,
  sortEnum,
} from '../../shared/models/page-request/page-request-dto';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customerList!: CustomStore;
  totalRecords: number = 0;
  paramModel: PageRequestDto = { page: 0, size: 10, sort: sortEnum.UNSORTED };
  focusedRowKey: any = undefined;
  autoNavigateToFocusedRow = true;
  errorMessage: string = '';
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadData(0, 10);
  }
  /*Load customer list*/
  public loadData(page: number = -1, size: number = 1) {
    this.customerList = new CustomStore({
      key: 'id',
      load: (loadOptions: any) => {
        if (page > -1) {
          this.paramModel.page = page;
        } else {
          this.paramModel.page = loadOptions.skip;
        }
        if (size > 1) {
          this.paramModel.size = size;
        } else {
          this.paramModel.size = loadOptions.take;
        }
        if (loadOptions.sort) {
          if (loadOptions.sort[0]?.desc == true) {
            this.paramModel.sort = sortEnum.DESC;
          } else {
            this.paramModel.sort = sortEnum.ASC;
          }
        } else {
          this.paramModel.sort = sortEnum.UNSORTED;
        }
        return firstValueFrom(
          this.customerService.GetCustomerPageList(this.paramModel)
        )
          .then((data: any) => {
            this.totalRecords = data.numberOfItems;
            return {
              data: data.overviewItems,
              totalCount: data.numberOfItems,
            };
          })
          .catch((error) => {
            throw error;
          });
      },
    });
  }

  /* Devextreme Data grid content ready*/
  onContentReady(e: any) {
    this.totalRecords = e.component.totalCount();
  }

  /* Devextreme Data grid row focus change*/
  onFocusedRowChanging(e: any) {
    const rowsCount = e.component.getVisibleRows().length;
    const pageCount = e.component.pageCount();
    const pageIndex = e.component.pageIndex();
    const key = e.event && e.event.key;

    if (key && e.prevRowIndex === e.newRowIndex) {
      if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
        e.component.pageIndex(pageIndex + 1).done(() => {
          e.component.option('focusedRowIndex', 0);
        });
      } else if (e.newRowIndex === 0 && pageIndex > 0) {
        e.component.pageIndex(pageIndex - 1).done(() => {
          e.component.option('focusedRowIndex', rowsCount - 1);
        });
      }
    }
  }

  /* Devextreme Data grid toolbar */
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        template: 'totalCount',
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'add',
          onClick: this.onAddClick.bind(this),
        },
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.loadData.bind(this),
        },
      }
    );
  }
  /* On add record */
  onAddClick() {
    const dialogRef = this.dialog.open(AddCustomerPopupComponent, {
      disableClose: true,
      data: 0,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != true) {
        this.loadData(0, 10);
      }
    });
  }

  /* On edit record */
  onEditRowClick(e: any) {
    const customer: CustomerDto = e.row && e.row.data;
    if (customer) {
      this.focusedRowKey = customer.id;
      const dialogRef = this.dialog.open(AddCustomerPopupComponent, {
        disableClose: true,
        data: this.focusedRowKey,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result != true) {
          this.loadData(0, 10);
        }
      });
    }
  }

  /* On delete record */
  onDeleteRowClick(e: any) {
    const rowData = e.row && e.row.data;
    if (rowData) {
      this.focusedRowKey = rowData.id;
      Swal.fire({
        title: 'Are you sure?',
        text: `you want to remove the customer: ${rowData?.firstName} ${rowData?.lastName}!`,

        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          firstValueFrom(this.customerService.DeleteCustomer(rowData.id))
            .then((data: any) => {
              this.toastrService.success('Record deleted successfully!');
              this.loadData(0, 10);
            })
            .catch((error) => {
              this.toastrService.error('An error occured!');
              throw error;
            });
        }
      });
    }
  }

  /***********************************************************************************************/
}
