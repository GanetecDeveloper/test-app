import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, 
  HttpRequest, 
  HttpHandler,
  HttpInterceptor, 
  HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const logger = this.injector.get(LoggingService);

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // refresh token
          console.debug('# [CORE - ERROR (GlobalErrorInterceptor)] TODO: capture error 401 and refresh token');
        } else {
          console.error('# [CORE - ERROR (GlobalErrorInterceptor)]', error.status)
          logger.addData(error.status + error.message);
          return throwError(error);
        }
      })
    );
  }
}