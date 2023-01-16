import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment'
import { tap } from 'rxjs/operators';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';
import { CreateUserDTO } from '../models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_DB_URL}/api`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private sessionService :SessionService
  ) { }

  signIn(username: string, password: string, remindme: boolean = false) {
    return this.http.post<Auth>(`${this.apiUrl}/auth`, {
      password,
      username
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.token, remindme)
        this.sessionService.setUser(response.user)
      })
    )
  }

  signUp({ fullname, mail, password, username }: CreateUserDTO) {
    return this.http.post<Auth>(`${this.apiUrl}/user`, {
      fullname,
      mail,
      password,
      username
    }).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token)
        this.sessionService.setUser(response.user)
      })
    )
  }

  signInByToken() {
    return this.http.get<Auth>(`${this.apiUrl}/auth`)
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.token)
        this.sessionService.setUser(response.user)
      })
    )
  }

}
