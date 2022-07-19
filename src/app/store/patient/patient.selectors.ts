import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromPatient from './patient.reducer';
import { Patient } from './models';

const pageSize = 10;

export interface State {
  patients: fromPatient.State;
}

export const reducers: ActionReducerMap<State> = {
  patients: fromPatient.reducer,
};

export const selectPatientState =
  createFeatureSelector<fromPatient.State>('patients');

export const selectPatientIds = createSelector(
  selectPatientState,
  fromPatient.selectPatientIds // shorthand for PatientsState => fromPatient.selectPatientIds(PatientsState)
);
export const selectPatientEntities = createSelector(
  selectPatientState,
  fromPatient.selectPatientEntities
);
export const selectAllPatients = createSelector(
  selectPatientState,
  fromPatient.selectAllPatients
);
export const selectPatientTotal = createSelector(
  selectPatientState,
  fromPatient.selectPatientTotal
);
export const selectCurrentPatientId = createSelector(
  selectPatientState,
  fromPatient.getSelectedPatientId
);

export const selectCurrentPatient = createSelector(
  selectPatientEntities,
  selectCurrentPatientId,
  (patientEntities, patientId) => patientId && patientEntities[patientId]
);

export const selectPatientIsLoading = createSelector(
  selectPatientState,
  (state) => state.isLoading
);

export const selectPatientsTotalCount = createSelector(
  selectPatientState,
  (state) => state.totalCount
);

export const selectPatientSearchPage = createSelector(
  selectPatientState,
  (state) => state.searchPage
);

export const selectPatientsForCurrentPage = createSelector(
  selectAllPatients,
  selectPatientSearchPage,
  (patients: Patient[], searchPage: number) =>
    searchPage >= 1 && searchPage <= Math.ceil(patients.length / pageSize)
      ? patients.slice((searchPage - 1) * pageSize, searchPage * pageSize)
      : []
);
