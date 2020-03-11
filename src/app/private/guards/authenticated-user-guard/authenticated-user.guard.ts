import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { SnackBarConstants } from '../../../shared/constants/snackbar.constants';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.validateAuthentication();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.validateAuthentication();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    return this.validateAuthentication();
  }

  private validateAuthentication(): boolean {
    const accessToken = this.authenticationService.accessTokenValue;
    if (accessToken) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login']).then(() =>
      this.snackBar.open('Доступ к данному ресурсу ограничен.', SnackBarConstants.CLOSE_ACTION, {
        duration: SnackBarConstants.SHORT_DURATION,
        panelClass: ['warn-text']
      })
    );
    return false;
  }
}
