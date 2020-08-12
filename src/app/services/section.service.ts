import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Section } from '../components/section';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'E56hDKeGND787xo2MmMu'
   })
};

@Injectable({ providedIn: 'root'})
export class SectionService {
  private sectionsUrl = 'v1/sections'; // URL to web api
  sections: Section[];
  activeSection: Section;

  constructor(private http: HttpClient) { }

  /** GET sections from the server */
  getSections(): Observable<Section[]> {
    if (!sessionStorage.getItem('sections') && !this.sections) {
      const sectionsObs = this.http.get<Section[]>(this.sectionsUrl)
        .pipe(
          catchError(this.handleError<Section[]>('getSections', []))
        );
      sectionsObs.subscribe(sections => {
        this.sections = sections;
        sessionStorage.setItem('sections', JSON.stringify(sections));
        // console.log('section.service.ts | getSections | Finished Fetching Sections');
      });
      return sectionsObs;
    }

    if (sessionStorage.getItem('sections')) {
      this.sections = JSON.parse(sessionStorage.getItem('sections'));
    }

    // console.log('section.service.ts | getSections | No need to fetch sections; Sections have already been Fetched');
    return of(this.sections);
  }

  /** GET hero by id. Will 404 if not found */
  getSection(section: string): Section {
    if (this.sections) {
      // console.log('section.service.ts | getSection | No need to fetch section; pulling activeSection from cached sections array');
      this.activeSection = this.sections.filter(s => s.name === section)[0];
      sessionStorage.setItem('section', JSON.stringify(this.sections.filter(s => s.name === section)[0]));
      return this.sections.filter(s => s.name === section)[0];
    }

    return this.activeSection;
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
