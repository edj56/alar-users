import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('alar.accessToken');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    }

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !err.url?.includes('/auth/login')) {
        localStorage.removeItem('alar.accessToken');
        this.router.navigate(['/auth/login']);
      }

      return throwError(err);
    }));
  }
}
