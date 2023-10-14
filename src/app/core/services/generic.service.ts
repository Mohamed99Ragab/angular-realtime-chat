import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ApiResponseVM } from '../interfaces/api-response-vm';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GenericService {

  headers:any;
  constructor(private _http:HttpClient) {}

  // Handle request
  private handleError(error: HttpErrorResponse) {   
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

 
  
  getAll(apiRoute:string):Observable<ApiResponseVM>{
    return this._http.get<ApiResponseVM>(`${environment.BaseUrl}${apiRoute}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }
  

  getById(id:number,apiRoute:string):Observable<ApiResponseVM>{
    return this._http.get<ApiResponseVM>(`${environment.BaseUrl}${apiRoute}/${id}`,)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }



  // Add Data To Api
  post(newObject:any,apiRoute:string):Observable<ApiResponseVM>{
    return this._http.post<ApiResponseVM>(`${environment.BaseUrl}${apiRoute}` , newObject,)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }


  // Update Data By Id
  put(newObject:any,apiRoute:string):Observable<ApiResponseVM>{
    return this._http.put<ApiResponseVM>(`${environment.BaseUrl}${apiRoute}` , newObject,)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  // Delete Data From Api By Id
  delete(id:number,apiRoute:string):Observable<ApiResponseVM>{
    return this._http.delete<ApiResponseVM>(`${environment.BaseUrl}${apiRoute}/${id}`,)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }



}


