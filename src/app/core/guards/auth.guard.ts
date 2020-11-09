import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(this.authService.isTokenExpired()) {
      if(!this.authService.getRefreshToken() || this.authService.isRefreshTokenExpired()) {
        console.log('Auth Guard ==> Unauthenticated user!');
        this.router.navigate(['/auth/login']);
        return false;
      }

      console.log('Auth Guard ==> Token expired! Getting new Token...');

      this.authService.refreshToken().subscribe(response => {
        this.authService.saveToken(response);
        console.log('Auth Guard ==> New token successfully created...');
        return true;
      }, errorResponse => {
        console.log('Auth Guard ==> Unauthenticated user!');
        this.router.navigate(['/auth/login']);
        return false;
      });
          
    } else if (next.data.roles && !this.authService.hasAnyRole(next.data.roles)) {
      this.router.navigate(['/unauthorized']);
      return false; 
    }
    
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (next.data.roles && !this.authService.hasAnyRole(next.data.roles)) {
      this.router.navigate(['/unauthorized']);
      return false; 
    }

    return true;
  }
}
