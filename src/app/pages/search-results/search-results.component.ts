import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../../components/recipe';

import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  query: string;
  hasResults = false;
  recipes: Recipe[];
  titleMatches: Recipe[];
  keywordMatches: Recipe[];
  categoryMatches: Recipe[];
  ingredientMatches: Recipe[];
  ratingMatches: Recipe[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.query = params.q;
        this.findMatches(params.q);
      });
  }

  findMatches(term: string): void {
    if (this.recipeService.allRecipes) {
      this.recipeService.allRecipes
        .subscribe(recipes => {
          // console.log('search-results.component.ts | findMatches | Fetching recipes from this.recipeService.allRecipes');
          this.getMatches(recipes, term);
        });
    } else if (sessionStorage.getItem('recipes')) {
      // console.log('search-results.component.ts | findMatches | Fetching recipes from sessionStorage');
      this.getMatches(JSON.parse(sessionStorage.getItem('recipes')), term);
    } else {
      this.hasResults = false;
      // console.log('search-results.component.ts | findMatches | Using this.recipeService.getAllRecipes()');
      this.recipeService.getAllRecipes();
      setTimeout(() => {
        this.findMatches(this.query);
      }, 20);
    }
  }

  getMatches(recipes: Recipe[], term: string): void {
    this.hasResults = false;
    this.titleMatches = recipes.filter(r => {
      if (r.displayName.toLowerCase().includes(term.toLowerCase())) {
        this.hasResults = true;
        return r;
        }
    });

    // Filter recipes list based on matched keywords
    this.keywordMatches = recipes.filter(r => {
      if (r.keywords.find((word: string) => word.toLowerCase().includes(term.toLowerCase()))) {
        this.hasResults = true;
        return r;
      }
    });

    // Update recipes with matched keywords to include the matched keyword
    this.keywordMatches = this.keywordMatches.map(r => {
      if (r.keywords.find((word: string) => word.toLowerCase().includes(term.toLowerCase()))) {
        return {...r, matchedKeyword: r.keywords.find((word: string) => word.toLowerCase().includes(term.toLowerCase()))};
      }
    });

    this.categoryMatches = recipes.filter(r => {
      if (r.category.toLowerCase().includes(term.toLowerCase())) {
        this.hasResults = true;
        return r;
        }
    });

    // Filter recipes list based on matched ingredients
    this.ingredientMatches = recipes.filter(r => {
      if (r.ingredients.find(i => i.item.toLowerCase().includes(term.toLowerCase()))) {
        this.hasResults = true;
        return r;
      }
    });

    // Update recipes with matched ingredients to include the matched ingredient
    this.ingredientMatches = this.ingredientMatches.map(r => {
      if (r.ingredients.find(i => i.item.toLowerCase().includes(term.toLowerCase()))) {
        return {...r, matchedIngredient: r.ingredients.find(i => i.item.toLowerCase().includes(term.toLowerCase())).item};
      }
    });


    this.ratingMatches = recipes.filter(r => {
      // tslint:disable-next-line:radix
      if (r.rating === parseInt(term)) {
        this.hasResults = true;
        return r;
        }
    });
  }

}
