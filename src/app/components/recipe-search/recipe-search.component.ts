import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Recipe } from '../recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  private searchTerms = new Subject<string>();
  clearResults = false;
  private resultsLimit: number;
  showAdvancedMenu = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private location: Location
  ) { }

  // Displays search results as you type
  quickSearch(term: string, limit: number): void {
    this.resultsLimit = limit;
    this.searchTerms.next(term);
  }

  // Displays search results on a separate page
  goToResults(term: string): void {
    this.router.navigate(['/searchResults'], { queryParams: { q: term } });
  }

  enableResults(): void {
    this.clearResults = false;
  }

  clearSearch(): void {
    this.clearResults = true;
  }

  ngOnInit(): void {
    this.recipes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.recipeService.searchRecipes(term, this.resultsLimit)),

    );
  }

  toggleAdvancedMenu(): void {
    this.showAdvancedMenu = !this.showAdvancedMenu;
  }


}
