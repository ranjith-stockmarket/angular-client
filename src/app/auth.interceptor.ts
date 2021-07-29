import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./service/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(AuthService.getToken()!=null && !req.url.includes("/api/authenticate")) {
      req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${AuthService.getToken()}`
          }
        });
    }
    return next.handle(req);
  }
}
