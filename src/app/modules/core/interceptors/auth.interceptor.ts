import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private securityService: SecurityService) {}

    /**
     * 
     * @param req 
     * @param next 
     */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    // Clone the request and replace the original headers with cloned headers, updated with the authorization.
    // const authReq = req.clone( this.securityService.addSecurityHeaders(req.headers) );
    const authReq = req;
    console.debug('# [CORE - SECURITY (AuthInterceptor)] Auth Intercept working - req: ', authReq);
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(catchError(this.handleAuthError));
  }

  /**
   * 
   * @param err 
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
      console.error('# [CORE - SECURITY (AuthInterceptor)] AUTH ERROR 401/403. calling logout.');
      this.securityService.logout();
      // if you've caught / handled the error, you don't want to rethrow
      // it unless you also want downstream consumers to have to handle it as well.
      return throwError('Auth error');
    }
    console.error('# [CORE - SECURITY (AuthInterceptor)] Error: ', err.status, err);
    return throwError(err);
  }

}
