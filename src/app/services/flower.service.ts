import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Flower } from '../components/flower';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'E56hDKeGND787xo2MmMu'
   })
};

@Injectable({ providedIn: 'root'})
export class FlowerService {
  private flowersUrl = 'v1/flowers'; // URL to web api
  flowerImage = '';

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.flowersUrl)
      .pipe(
        // tap(_ => this.log('fetched Floweres')),
        catchError(this.handleError<Flower[]>('getFlowers', []))
      );
  }

  updateImg(flower: Flower): void {
    this.flowerImage = flower.image;
    console.log(`flower.service.ts | updateImg | ${this.flowerImage}`);
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
