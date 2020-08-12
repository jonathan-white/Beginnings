import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Recipe } from '../components/recipe';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'E56hDKeGND787xo2MmMu'
   })
};

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'v1/recipes'; // URL to web api
  recipe: Observable<Recipe>;
  recipes: Observable<Recipe[]>;
  allRecipes: Observable<Recipe[]>;
  recipesAll: Recipe[];

  constructor(private http: HttpClient) { }

  // ****************************
  // ** GET Recipes */
  // ****************************

  getAllRecipes(): Observable<Recipe[]> {
    this.allRecipes = this.http.get<Recipe[]>(this.recipesUrl)
    .pipe(
      catchError(this.handleError<Recipe[]>('getAllRecipes', []))
    );
    this.allRecipes.subscribe(recipes => {
      this.recipesAll = recipes;
      sessionStorage.setItem('recipes', JSON.stringify(recipes));
    });
    return this.allRecipes;
  }

  /** GET recipes from the server */
  getSectionRecipes(section: string): Observable<Recipe[]> {
    this.recipes = this.http.get<Recipe[]>(`${this.recipesUrl}/section/${section}`)
    .pipe(
      // tap(_ => console.log('recipe.service.ts | getRecipes | fetched Recipes')),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
    return this.recipes;
  }

  /** GET recipe by title. Will 404 if not found */
  getRecipe(recipePath: object): Observable<Recipe> {
    const url = `${this.recipesUrl}/${recipePath['section']}/${recipePath['title']}`;
    return this.http.get<Recipe>(url).pipe(
      // tap(_ => console.log(`recipe.service.ts | getRecipe | fetched recipe title=${recipePath['title']}`)),
      catchError(this.handleError<Recipe>(`getRecipe title=${recipePath['title']}`))
    );
  }

  /** GET recipe by id. Will 404 if not found */
  getRecipeById(recipeId: string): Observable<Recipe> {
    const url = `${this.recipesUrl}/${recipeId}`;
    return this.http.get<Recipe>(url).pipe(
      catchError(this.handleError<Recipe>(`getRecipe id=${recipeId}`))
    );
  }

  searchRecipes(term: string, limit: number, options?: object): Observable<Recipe[]> {
    if (!term.trim()) {
      // If not search term, return empty recipe array.
      return of([]);
    }
    return this.http.get<Recipe[]>(`v1/search/recipes?q=${term}&limit=${limit}`).pipe(
      catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }

  // ****************************
  // ** PUT Recipes */
  // ****************************

  // Updates an existing recipe based on the Recipe ID
  updateRecipe(recipeData: any): Observable<Recipe> {
    const url = `${this.recipesUrl}/${recipeData._id}`;
    return this.http.put<Recipe>(url, recipeData, httpOptions).pipe(
      // tap(_ => console.log(`recipe.service.ts | getRecipe | fetched recipe title=${recipePath['title']}`)),
      catchError(this.handleError<Recipe>(`updateRecipe id=${recipeData._id}`))
    );
  }

  // PUT and POST

  // Updates an existing recipe if the recipeData includes an _id key
  // Adds a new recipe if no _id key exists
  addOrUpdateRecipe(recipeData: any): Observable<Recipe> {
    const url = recipeData._id ? `${this.recipesUrl}/${recipeData._id}` : this.recipesUrl;

    if (recipeData._id) {
      return this.http.put<Recipe>(url, recipeData, httpOptions).pipe(
        catchError(this.handleError<Recipe>(`updateRecipe id=${recipeData._id}`))
      );
    } else {
      return this.http.post<Recipe>(url, recipeData, httpOptions).pipe(
        catchError(this.handleError<Recipe>(`postRecipe displayName=${recipeData.displayName}`))
      );
    }
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
