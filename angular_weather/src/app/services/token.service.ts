import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null = null

  constructor() { }

  saveToken(token: string, saveInLocal: boolean = false) {
    sessionStorage.setItem('token', token)
    if (saveInLocal) localStorage.setItem('token', token)
  }

  getToken(): string | null {
    if (this.token) return this.token
    this.token = sessionStorage.getItem('token') ?? localStorage.getItem('token')
    return this.token
  }

  removeToken() {
    this.token = null
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
  }
}
