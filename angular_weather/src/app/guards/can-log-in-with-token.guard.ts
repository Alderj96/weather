import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CanLogInWithTokenGuard implements CanActivate {

  constructor (
    private sessionService: SessionService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
    return this.canLogInWithTokenSaved();
  }

  private canLogInWithTokenSaved (): Observable<boolean | UrlTree> | boolean {
    const token = this.tokenService.getToken()
    if (!token) return true;
    return this.authService.signInByToken()
    .pipe(
      switchMap(_ => this.sessionService.isLoggedIn$),
      map(isLoggedIn => isLoggedIn ? this.router.createUrlTree(['/principal']) : true),
    )
  }
}
