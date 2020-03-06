import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      Accept: 'application/json'
    };
    
    const token = localStorage.getItem('token');

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
