import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor() {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let depth;
      const mt = JSON.parse(localStorage.getItem('mt'));

      const timestamp = mt.sessionStartTime;
      const activeTime = Date.now() - timestamp;
      mt.sessionDepth ? depth = JSON.parse(localStorage.getItem('mt')).sessionDepth : depth = [];
      depth.push(state.url);

      localStorage.setItem('mt', JSON.stringify({
        sessionDepth: depth,
        sessionStartTime: timestamp,
        timeOnSite: activeTime
      }));
      return true;
  }

}
