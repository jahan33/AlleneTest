import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageRequestDto } from '../../models/page-request/page-request-dto';
import {
  VehicleDto,
  VehiclePageResponseDto,
} from '../../models/vehicle/vehicle-dto';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  /* Get Vehicle Page List */
  public GetVehiclePageList(
    pageRequestDto: PageRequestDto
  ): Observable<VehiclePageResponseDto> {
    const path =
      environment.vehicles_get +
      `?page=${pageRequestDto.page}&size=${pageRequestDto.size}&sort=${pageRequestDto.sort}`;

    return this.http.get<VehiclePageResponseDto>(path).pipe(
      map((response: VehiclePageResponseDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Get Vehicle */
  public GetVehicle(id: number): Observable<VehicleDto> {
    const path = `${environment.vehicle_crud}/${id}`;

    return this.http.get<VehicleDto>(path).pipe(
      map((response: VehicleDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Add Vehicle */
  public AddVehicle(vehicleDto: VehicleDto): Observable<VehicleDto> {
    const path = environment.vehicle_crud;

    return this.http.post<VehicleDto>(path, vehicleDto).pipe(
      map((response: VehicleDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /*  Update Vehicle */
  public UpdateVehicle(
    vehicleDto: VehicleDto,
    id: number
  ): Observable<VehicleDto> {
    const path = `${environment.vehicle_crud}/${id}`;

    return this.http.put<VehicleDto>(path, vehicleDto).pipe(
      map((response: VehicleDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Delete Vehicle */
  public DeleteVehicle(id: number): Observable<VehicleDto> {
    const path = `${environment.vehicle_crud}/${id}`;

    return this.http.delete<VehicleDto>(path).pipe(
      map((response: VehicleDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Handle Error */
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage =
        'Server returned code: ${err.status}, error message is: ${err.message}';
    }
    return throwError({
      errorCode: err.status,
      errorMessage: errorMessage,
      error: err.error,
    });
  }

  /*******************************************************************************************************************/
}
