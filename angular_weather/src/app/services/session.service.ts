import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private usuario = new BehaviorSubject<User | null>(null)
  user$ = this.usuario.asObservable()
  isLoggedIn$ = this.user$.pipe(map(Boolean))

  constructor() { }

  setUser(usuario: User) {
    this.usuario.next(usuario)
  }

  clearUser() {
    this.usuario.next(null)
  }

  get lastValueEmitted () {
    return this.usuario.getValue()
  }
}
