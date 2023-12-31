import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router:Router,
    // private toastr:ToastrService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
        if(err){
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.toastr.error(err.error.message, err.status.toString())
            }
            if (err.status === 400) {
              if(err.error.errors)
              {
                throw err.error;
              }
              else
  
              {
                // this.toastr.error(err.error.message, err.status.toString())
              }
            }
            if (err.status === 404) {
              // auto logout if 401 response returned from api
              // this.router.navigateByUrl('/not-found')
            }
            if(err.status==500)
            {
              const navigationExtras: NavigationExtras = {state: {error: err.error}};
              // this.router.navigateByUrl('/server-error', navigationExtras);
            }

        }

          const error = err.error.message || err.statusText;
          
          return throwError(() => error);
      }))
  }
}
