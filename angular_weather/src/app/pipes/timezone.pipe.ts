import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'timezone'
})
export class TimezonePipe implements PipeTransform {

  transform(value: number | null, timezone: string | null): unknown {
    if (!value || !timezone) return ''
    return moment(value).tz(timezone).format('hh:mm:ss a');
  }

}
