import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { MapStatePatients, Patient } from './models';

export const loadPatients = createAction('[Patient/API] Load Patients');

export const loadPatientsSuccess = createAction(
  '[Patient/API] Load Patients Success',
  props<MapStatePatients>()
);

export const loadPatientsFailure = createAction(
  '[Patient/API] Load Patients Failure'
);

export const setPatientSearchPage = createAction(
  '[Patient/API] Set Patient Search Page',
  props<{ searchPage: number }>()
);

export const updateSelectedPatientId = createAction(
  '[Patient/API] Update Selected Patient Id',
  props<{ id: string }>()
);

export const addPatient = createAction(
  '[Patient/API] Add Patient',
  props<{ patient: Patient }>()
);

export const addPatientSuccess = createAction(
  '[Patient/API] Add Patient Success',
  props<{ patient: Patient }>()
);

export const addPatientFailure = createAction(
  '[Patient/API] Add Patient Failure'
);

export const upsertPatient = createAction(
  '[Patient/API] Upsert Patient',
  props<{ patient: Patient }>()
);

export const addPatients = createAction(
  '[Patient/API] Add Patients',
  props<{ patients: Patient[] }>()
);

export const upsertPatients = createAction(
  '[Patient/API] Upsert Patients',
  props<{ patients: Patient[] }>()
);

export const updatePatient = createAction(
  '[Patient/API] Update Patient',
  props<{ patientUpdate: Update<Patient> }>()
);

export const updatePatientSuccess = createAction(
  '[Patient/API] Update Patient Success',
  props<{ patientUpdate: Update<Patient> }>()
);

export const updatePatientFailure = createAction(
  '[Patient/API] Update Patient Failure'
);

export const updatePatients = createAction(
  '[Patient/API] Update Patients',
  props<{ patients: Update<Patient>[] }>()
);

export const deletePatient = createAction(
  '[Patient/API] Delete Patient',
  props<{ id: string }>()
);

export const deletePatients = createAction(
  '[Patient/API] Delete Patients',
  props<{ ids: string[] }>()
);

export const clearPatients = createAction('[Patient/API] Clear Patients');
