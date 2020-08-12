import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ingredient } from '../components/ingredient';
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
export class IngredientService {
  private ingredientsUrl = 'v1/ingredients'; // URL to web api
  ingredient: Observable<Ingredient>;
  allIngredients: Observable<Ingredient[]>;
  ingredientsAll: Ingredient[];

  constructor(private http: HttpClient) { }

  // ****************************
  // ** GET Methods */
  // ****************************
  getAllIngredients(): Observable<Ingredient[]> {
    this.allIngredients = this.http.get<Ingredient[]>(this.ingredientsUrl)
    .pipe(
      catchError(this.handleError<Ingredient[]>('getAllIngredients', []))
    );
    this.allIngredients.subscribe(recipes => {
      this.ingredientsAll = recipes;
    });
    return this.allIngredients;
  }

  // ****************************
  // ** POST Methods */
  // ****************************

  createIngredient(ingredientData: any): Observable<Recipe> {
    return this.http.post<Recipe>(this.ingredientsUrl, ingredientData, httpOptions).pipe(
      tap(_ => console.log(`ingredient.service.ts | createIngredient | new ingredient displayName=${ingredientData.displayName}`)),
      catchError(this.handleError<Recipe>(`createIngredient id=${ingredientData._id}`))
    );
  }

  // ****************************
  // ** PUT Methods */
  // ****************************

  updateIngredient(id: string, ingredientData: any): Observable<Ingredient> {
    const url = `${this.ingredientsUrl}/${id}`;
    return this.http.put<Ingredient>(url, ingredientData, httpOptions).pipe(
      tap(_ => console.log(`ingredient.service.ts | updateIngredient | ingredient id=${id}`)),
      catchError(this.handleError<Ingredient>(`updateIngredient id=${id}`))
    );
  }

  // ****************************
  // ** DELETE Methods */
  // ****************************

  deleteIngredient(id: string): Observable<{}> {
    const url = `${this.ingredientsUrl}/${id}`;
    return this.http.delete<Ingredient>(url, httpOptions).pipe(
      tap(_ => console.log(`ingredient.service.ts | deleteIngredient | ingredient id=${id}`)),
      catchError(this.handleError<Ingredient>(`deleteIngredient id=${id}`))
    );
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
