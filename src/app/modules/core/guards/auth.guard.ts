import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  CanActivateChild, 
  Router, 
  RouterStateSnapshot } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private securityService: SecurityService) {}

  /**
   * 
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Si tenemos token activo y no ha caducado, entonces dejamos pasar
    console.log("TEST!!!!!!!!!!!!!!!!!!!!!!!");
    if (this.securityService.isValidSession()) {
      console.log('# [CORE - SECURITY (AuthGuard)] session valid');
      if(route.data && route.data.roles) {
        let roles = route.data.roles as Array<string>;
        if(this.securityService.checkProfiles(roles, route.data.multiple)) {
          console.log('# [CORE - SECURITY (AuthGuard)] profiles OK');
          return true;
        } else {
          console.log('# [CORE - SECURITY (AuthGuard)] profiles error');
          this.router.navigate(['/']);
          return false
        }
      } else {
        console.log('# [CORE - SECURITY (AuthGuard)] roles error');
        return true;
      }
    } else {
      console.log('# [CORE - SECURITY (AuthGuard)] session error');
      this.securityService.closeSession(state.url);
      // TODO cerrar en back
      // this.router.navigate(['/login'], { queryParams: { return: state.url } });
      return false;
    }
  }

  /**
   * 
   * @param route 
   * @param state 
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
  }
}
