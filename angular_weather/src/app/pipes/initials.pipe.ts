import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: String | null): string {
    if (!value) return ''
    const names = value.split(' ');
    const initials = names.shift()!.charAt(0) + names.pop()!.charAt(0);
    return initials.toUpperCase()
  }

}
