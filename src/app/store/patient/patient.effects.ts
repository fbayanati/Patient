import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PatientService } from './api/patient.service';

import * as PatientActions from './patient.actions';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PatientEffects {
  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatients),
      mergeMap((action) =>
        this.patientService.patients().pipe(
          map(({ totalCount, patients, searchPage }) =>
            PatientActions.loadPatientsSuccess({
              totalCount,
              patients,
              searchPage,
            })
          ),
          catchError(() => {
            this.router.navigate(['/']);
            return of(PatientActions.loadPatientsFailure());
          })
        )
      )
    )
  );

  deletePatients$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PatientActions.deletePatient),
        mergeMap((action) => this.patientService.deletePatient(action.id))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private patientService: PatientService,
    private router: Router
  ) {}
}
