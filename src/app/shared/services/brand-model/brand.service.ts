import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BrandDto, BrandModelDto } from '../../models/brand-model/brand-dto';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}
  /* Get Brand */
  public GetBrand(): Observable<BrandDto[]> {
    const path = `${environment.brands_get}`;

    return this.http.get<BrandDto[]>(path).pipe(
      map((response: BrandDto[]) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  /* Get brand models */
  public GetBrandsModel(brandId?: number): Observable<BrandModelDto[]> {
    const path = `${environment.brand_model_get}/${brandId}/models`;

    return this.http.get<BrandModelDto[]>(path).pipe(
      map((response: BrandModelDto[]) => {
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
}
