import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  pure: false
})
export class CategoryPipe implements PipeTransform {

  transform(value: any[], cat?: string): any {
    const filtered = value.filter(e => {
      if (cat === 'undefined' && !e.category) {
        return e;
      }
      return e.category === cat;
    });

    return filtered;
  }

}
