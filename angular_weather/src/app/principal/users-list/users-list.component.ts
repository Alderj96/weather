import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usuarios: User[] = []
  headers: String[] = [
    'Nombre',
    'Correo Electronico',
    'Fecha de Registro',
    'Último Login'
  ]

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.getUserList()
    .subscribe(
      value => this.usuarios = value
    )
  }

}
