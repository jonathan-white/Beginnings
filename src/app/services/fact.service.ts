import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Fact } from '../components/fact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'E56hDKeGND787xo2MmMu'
   })
};

@Injectable({ providedIn: 'root'})
export class FactService {
  private factsUrl = 'v1/facts'; // URL to web api
  facts: Fact[];

  constructor(private http: HttpClient) { }

  /** GET facts from the server */
  getFacts(): Observable<Fact[]> {
    return this.http.get<Fact[]>(this.factsUrl)
      .pipe(
        // tap(_ => this.log('fetched Factes')),
        catchError(this.handleError<Fact[]>('getFacts', []))
      );
  }

  loadFacts(): void {
    this.getFacts().subscribe(facts => {
      this.facts = facts;
      sessionStorage.setItem('facts', JSON.stringify(facts));
    });
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
