import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {
  catchError,
  Observable,
  throwError
} from 'rxjs';

import { Router } from '@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router , private toaster:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error, caught) => {
      if(error){
        if(error === 400) this.toaster.error(error.error.message , error.status.toString())
        if(error === 401) this.toaster.error(error.error.message , error.status.toString())
        if(error.status === 404) this.router.navigateByUrl('/not-found');
        if(error.status === 500) this.router.navigateByUrl('/server-error');
      }
      return throwError(() => new Error(error.message)) ;
    })) as any;
  }
}
