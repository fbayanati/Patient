import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapStatePatients, Patient } from '../models';
import pick from 'lodash/pick';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  patients(): Observable<MapStatePatients> {
    let params = new HttpParams();

    const extractdata = (response: unknown[]): MapStatePatients => ({
      totalCount: response.length,
      patients: response.map(
        (item) =>
          pick(item, [
            'id',
            'firstName',
            'lastName',
            'email',
            'gender',
            'address',
            'healthCareId',
            'clinic',
          ]) as Patient
      ),
      searchPage: 1,
    });

    return this.http
      .get(environment.api.patients, {
        headers: new HttpHeaders({}),
        params,
      })
      .pipe(
        map((response) => extractdata(response as unknown[])),
        catchError(this.onError)
      );
  }

  onError(error: HttpErrorResponse): Observable<never> {
    window.alert(
      error.error?.message ??
        'JSON Server API for Patient is encountered with error'
    );
    return throwError(
      () => new Error('JSON Server API for Patient is failing!')
    );
  }

  deletePatient(id: string): Observable<boolean> {
    let params = new HttpParams();

    return this.http
      .delete(`${environment.api.patients}/${id}`, {
        headers: new HttpHeaders({}),
        params,
      })
      .pipe(
        map((response) => true),
        catchError(this.onError)
      );
  }

  newPatient(patient: Patient): Observable<Patient> {
    let params = new HttpParams();

    return this.http
      .post<Patient>(`${environment.api.patients}`, patient, {
        headers: new HttpHeaders({}),
        params,
      })
      .pipe(catchError(this.onError));
  }

  updatePatient(patientUpdate: Update<Patient>): Observable<Patient> {
    let params = new HttpParams();

    return this.http
      .put<Patient>(
        `${environment.api.patients}/${patientUpdate.id}`,
        patientUpdate.changes,
        {
          headers: new HttpHeaders({}),
          params,
        }
      )
      .pipe(catchError(this.onError));
  }
}
