import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_DB_URL}/api`

  constructor(
    private http: HttpClient
  ) { }

  getUserList() {
    return this.http.get<User[]>(`${this.apiUrl}/user`)
  }
}
