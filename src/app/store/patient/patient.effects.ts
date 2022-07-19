import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PatientService } from './api/patient.service';

import * as PatientActions from './patient.actions';

import { of, first } from 'rxjs';
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

  newPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.addPatient),
      mergeMap((action) =>
        this.patientService.newPatient(action.patient).pipe(
          first(),
          map((patient) => {
            debugger;
            return PatientActions.addPatientSuccess({
              patient,
            });
          }),
          catchError(() => {
            this.router.navigate(['/']);
            return of(PatientActions.addPatientFailure());
          })
        )
      )
    )
  );

  updatePatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.updatePatient),
      mergeMap((action) =>
        this.patientService.updatePatient(action.patientUpdate).pipe(
          first(),
          map((patient) => {
            debugger;
            return PatientActions.updatePatientSuccess({
              patientUpdate: { id: patient.id, changes: patient },
            });
          }),
          catchError(() => {
            this.router.navigate(['/']);
            return of(PatientActions.addPatientFailure());
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private patientService: PatientService,
    private router: Router
  ) {}
}
