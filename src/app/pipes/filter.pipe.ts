import { Pipe, PipeTransform } from '@angular/core';

import { Recipe } from '../components/recipe';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(sectionRecipes: Recipe[], query: string): any {
    return sectionRecipes.filter(recipe => recipe.displayName.toLowerCase().includes(query.toLowerCase()));
  }

}
