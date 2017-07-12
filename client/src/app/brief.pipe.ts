import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brief'
})
export class BriefPipe implements PipeTransform {

  transform(value: string, blength?: number): string {
    return value.substring(0, blength ? blength : 110);
  }

}
