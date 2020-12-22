import { Injectable, Inject } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  constructor(
    @Inject('env') private ENV,
  ) {}

  /**
   * Clone request and replace 'http://' with 'https://' at the same time
   * @param req 
   * @param next 
   */
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.ENV.production) { // !req.url.includes("")) {
      return next.handle(req);
    }
    console.debug(" # [CORE - SECURITY (HttpsInterceptor)]");

    const httpsReq = req.clone({
      url: req.url.replace("http://", "https://")
    });

    return next.handle(httpsReq);
  }
}
