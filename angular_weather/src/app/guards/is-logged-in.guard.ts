import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, pipe, switchMap, tap } from 'rxjs';
import { SessionService } from '../services/session.service';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanLoad, CanActivate {

  constructor (
    private sessionService: SessionService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isLoggedIn();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isLoggedIn();
  }

  private recoverLogIn (): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      this.authService.signInByToken()
      .pipe(
        switchMap(_ => this.isLoggedIn(false))
      )
      .subscribe({
        next: value => resolve(value),
        error: _ => reject(false)
      })
    })
  }

  private isLoggedIn(verify: boolean = true): Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
    const token = this.tokenService.getToken()
    const usuario = this.sessionService.lastValueEmitted;
    if (verify && token && !usuario) return this.recoverLogIn()
    return this.sessionService.isLoggedIn$.pipe(
      map(isLoggedIn => isLoggedIn || this.router.createUrlTree(['/']))
    );
  }
}
