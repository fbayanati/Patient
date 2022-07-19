import { patientsFeatureKey, State } from '../patient.reducer';

export interface WithPatientState {
  [patientsFeatureKey]: State;
}
