import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CustomerDto,
  CustomerPageResponseDto,
} from '../../models/customer/customer-dto';
import { PageRequestDto } from '../../models/page-request/page-request-dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  /* Get Customer Page List */
  public GetCustomerPageList(
    pageRequestDto: PageRequestDto
  ): Observable<CustomerPageResponseDto> {
    const path =
      environment.customer_get +
      `?page=${pageRequestDto.page}&size=${pageRequestDto.size}&sort=${pageRequestDto.sort}`;

    return this.http.get<CustomerPageResponseDto>(path).pipe(
      map((response: CustomerPageResponseDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Get Customer */
  public GetCustomer(id: number): Observable<CustomerDto> {
    const path = `${environment.customer_crud}/${id}`;

    return this.http.get<CustomerDto>(path).pipe(
      map((response: CustomerDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Add Customer */
  public AddCustomer(customerDto: CustomerDto): Observable<CustomerDto> {
    const path = environment.customer_crud;

    return this.http.post<CustomerDto>(path, customerDto).pipe(
      map((response: CustomerDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /*  Update Customer */
  public UpdateCustomer(
    customerDto: CustomerDto,
    id: number
  ): Observable<CustomerDto> {
    const path = `${environment.customer_crud}/${id}`;

    return this.http.put<CustomerDto>(path, customerDto).pipe(
      map((response: CustomerDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Delete Customer */
  public DeleteCustomer(id: number): Observable<CustomerDto> {
    const path = `${environment.customer_crud}/${id}`;

    return this.http.delete<CustomerDto>(path).pipe(
      map((response: CustomerDto) => {
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
