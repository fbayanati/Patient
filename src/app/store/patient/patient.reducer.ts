import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PatientActions from './patient.actions';
import { Patient } from './models';

export const patientsFeatureKey = 'patients';

export interface State extends EntityState<Patient> {
  totalCount: number;
  searchPage: number;
  selectedPatientId: string | null;
  isLoading: boolean;
}

export const adapter: EntityAdapter<Patient> = createEntityAdapter<Patient>();

console.log('initialState :: Patient');
export const initialState: State = adapter.getInitialState({
  totalCount: 0,
  searchPage: 0,
  selectedPatientId: null,
  isLoading: false,
});

export const reducer = createReducer(
  initialState,
  on(PatientActions.addPatient, (state, action) =>
    adapter.addOne(action.patient, state)
  ),
  on(PatientActions.upsertPatient, (state, action) =>
    adapter.upsertOne(action.patient, state)
  ),
  on(PatientActions.addPatients, (state, action) =>
    adapter.addMany(action.patients, state)
  ),
  on(PatientActions.upsertPatients, (state, action) =>
    adapter.upsertMany(action.patients, state)
  ),
  on(PatientActions.updatePatient, (state, action) =>
    adapter.updateOne(action.patient, state)
  ),
  on(PatientActions.updatePatients, (state, action) =>
    adapter.updateMany(action.patients, state)
  ),
  on(PatientActions.deletePatient, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(PatientActions.deletePatients, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(PatientActions.loadPatients, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(PatientActions.loadPatientsSuccess, (state, action) => {
    const updatedState = action.patients?.length
      ? adapter.setAll(action.patients, state)
      : adapter.removeAll(state);

    return {
      ...updatedState,
      totalCount: action.totalCount,
      searchPage: action.searchPage,
      isLoading: false,
    };
  }),
  on(PatientActions.loadPatientsFailure, (state) => {
    const updatedState = adapter.removeAll(state);
    return {
      ...updatedState,
      totalCount: 0,
      searchPage: 0,
      isLoading: false,
    };
  }),
  on(PatientActions.setPatientSearchPage, (state, action) => {
    return {
      ...state,
      searchPage: action.searchPage,
    };
  }),
  on(PatientActions.updateSelectedPatientId, (state, action) => {
    return {
      ...state,
      selectedPatientId: action.id,
    };
  }),
  on(PatientActions.clearPatients, (state) => adapter.removeAll(state))
);

export const getSelectedPatientId = (state: State) => state.selectedPatientId;

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of patient ids
export const selectPatientIds = selectIds;

// select the dictionary of patient entities
export const selectPatientEntities = selectEntities;

// select the array of patients
export const selectAllPatients = selectAll;

// select the total patient count
export const selectPatientTotal = selectTotal;
