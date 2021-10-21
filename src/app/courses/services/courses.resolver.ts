import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CourseEntityService} from './course-entity.service';
import {filter, first, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<boolean> {

  constructor(private courseEntityServ: CourseEntityService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.courseEntityServ.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.courseEntityServ.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()  // completes the observable and make sure the transition goes through
      );
  }
}
