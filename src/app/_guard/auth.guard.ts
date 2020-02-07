import { ApiService } from './../services/api.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private apiService: ApiService) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const currentUser = this.apiService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

