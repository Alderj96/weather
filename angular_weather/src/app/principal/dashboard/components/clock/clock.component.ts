import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountryCitySelectedService } from 'src/app/services/country-city-selected.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {

  timer: NodeJS.Timer | null = null
  time: number = Date.now()
  timezone: string | null = null

  constructor(
    private countryCitySelectedService: CountryCitySelectedService,
  ) { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.time = Date.now()
    }, 1000)
    this.countryCitySelectedService.city$
    .subscribe(data => this.timezone = data?.timezone || null)
  }

  ngOnDestroy(): void {
    console.log('terminar')
    if (this.timer) clearInterval(this.timer)
  }

}
