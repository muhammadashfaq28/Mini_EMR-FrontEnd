import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as VisitActions from './visit.actions';
import { VisitsService } from '../services/visits.service';

@Injectable()
export class VisitEffects {
  private readonly actions$ = inject(Actions);
  private readonly visitsService = inject(VisitsService);
  private readonly router = inject(Router);

  readonly saveVisit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VisitActions.saveVisit),
      switchMap(action =>
        this.visitsService.saveVisit(action.request).pipe(
          map(() => VisitActions.saveVisitSuccess()),
          catchError(() =>
            of(VisitActions.saveVisitFailure({ error: 'Failed to save visit' }))
          )
        )
      )
    )
  );

  readonly saveVisitSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VisitActions.saveVisitSuccess),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );
}