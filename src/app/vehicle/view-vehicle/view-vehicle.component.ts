import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { catchError, firstValueFrom, tap } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../shared/services/vehicle/vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDto } from '../../shared/models/vehicle/vehicle-dto';
import { AddVehiclePopupComponent } from '../add-vehicle-popup/add-vehicle-popup.component';
import {
  PageRequestDto,
  sortEnum,
} from '../../shared/models/page-request/page-request-dto';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss'],
})
export class ViewVehicleComponent implements OnInit {
  @Output() onSelectVehicle = new EventEmitter();
  vehicleList!: CustomStore;
  totalRecords: number = 0;
  paramModel: PageRequestDto = { page: 0, size: 10, sort: sortEnum.UNSORTED };
  @Input() focusedRowKey: any = undefined;
  autoNavigateToFocusedRow = true;
  errorMessage: string = '';
  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  /*Load vehicle list*/
  public loadData() {
    this.vehicleList = new CustomStore({
      key: 'id',
      load: (loadOptions: any) => {
        this.paramModel.page = loadOptions.skip;
        this.paramModel.size = loadOptions.take;
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
          this.vehicleService.GetVehiclePageList(this.paramModel)
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
    const dialogRef = this.dialog.open(AddVehiclePopupComponent, {
      disableClose: true,
      data: 0,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != true) {
        this.onSelectVehicle.emit(result);
      }
    });
  }

  /* On Select Vehicle */
  onRowClick(event: any) {
    this.onSelectVehicle.emit(event.data);
  }

  /***********************************************************************************************/
}
