import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access_token = this.authService.getToken();
    
    if(access_token && !request.url.endsWith('/auth/oauth/token')) {
      request = this.addToken(request, access_token);
    }
    
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log('Token Interceptor ==> Token expired! Getting new Token...');
        return this.callRefreshToken(request, next).pipe(catchError(errorRefreshToken => {
          console.log('Token Interceptor ==> Token not generated... :(');
          this.logout();
          throw errorRefreshToken;
        }));
      } else if (error.error.error === 'invalid_grant') {
        throw error;
      } else {
        this.logout();
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private callRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(switchMap((response) => {
      this.authService.saveToken(response);
      const access_token = this.authService.getToken();
      console.log('Token Interceptor ==> New token successfully created...');
      return next.handle(this.addToken(request, access_token));
    }));
  }

  private logout() {
    this.authService.deleteToken();
    this.router.navigate(['/auth/login']);
  }
}
