import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the Bearer token from local storage
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // Clone the request and add the authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Pass the cloned request with the authorization header to the next handler
      return next.handle(authReq);
    }

    // If there's no authToken in local storage, pass the original request
    return next.handle(req);
  }
}
