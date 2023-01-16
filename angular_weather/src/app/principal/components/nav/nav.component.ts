import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { map, Observable } from 'rxjs';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
import { CountryCitySelectedService } from '../../../services/country-city-selected.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  nombreUsuario$: Observable<String>;

  constructor(
    private sessionService: SessionService,
    private tokenService: TokenService,
    private countryCitySelectedService: CountryCitySelectedService,
    private router: Router
  ) {
    this.nombreUsuario$ = this.sessionService.user$.pipe(
      map(user => user?.fullname ?? '')
    )
  }

  ngOnInit(): void {
  }

  onLogOut() {
    this.sessionService.clearUser()
    this.tokenService.removeToken()
    this.countryCitySelectedService.clearData()
    this.router.navigate(['/'])
  }

}
