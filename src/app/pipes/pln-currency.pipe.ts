import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plncurrency'
})
export class PlnCurrencyPipePipe implements PipeTransform {

  transform(value: number): string {
    const convertedValue = value.toFixed(2);
    return `${convertedValue} zł`;
  }

}
