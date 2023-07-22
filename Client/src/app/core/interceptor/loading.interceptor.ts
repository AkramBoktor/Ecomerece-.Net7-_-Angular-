import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize,delay, Observable } from 'rxjs';
import { BusyService } from '../services/busy.service';
;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private buseyService : BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.buseyService.start();
    return next.handle(request).pipe(
      delay(1000),
      finalize(()=> this.buseyService.end())
    );
  }
}
