import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectionFilter'
})
export class SectionFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.section === filter);
  }
}
