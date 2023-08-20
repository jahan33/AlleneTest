import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, pipe, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ContractDto,
  ContractOverviewPageResponseDto,
} from '../../models/contract/contract-overview-dto';
import { PageRequestDto } from '../../models/page-request/page-request-dto';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) {}

  /* Get Contract Page List */
  public GetContractPageList(
    pageRequestDto: PageRequestDto
  ): Observable<ContractOverviewPageResponseDto> {
    const path =
      environment.contractOverview_get +
      `?page=${pageRequestDto.page}&size=${pageRequestDto.size}&sort=${pageRequestDto.sort}`;

    return this.http.get<ContractOverviewPageResponseDto>(path).pipe(
      map((response: ContractOverviewPageResponseDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Get Contract */
  public GetContract(id: number): Observable<ContractDto> {
    const path = `${environment.contract_crud}/${id}`;

    return this.http.get<ContractDto>(path).pipe(
      map((response: ContractDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Add Contract */
  public AddContract(contractDto: ContractDto): Observable<ContractDto> {
    const path = environment.contract_crud;

    return this.http.post<ContractDto>(path, contractDto).pipe(
      map((response: ContractDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /*  Update Contract */
  public UpdateContract(
    contractDto: ContractDto,
    id: number
  ): Observable<ContractDto> {
    const path = `${environment.contract_crud}/${id}`;

    return this.http.put<ContractDto>(path, contractDto).pipe(
      map((response: ContractDto) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /* Delete Contract */
  public DeleteContract(id: number): Observable<ContractDto> {
    const path = `${environment.contract_crud}/${id}`;

    return this.http.delete<ContractDto>(path).pipe(
      map((response: ContractDto) => {
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
