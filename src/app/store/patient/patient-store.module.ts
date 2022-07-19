import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPatient from './patient.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from './patient.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPatient.patientsFeatureKey, fromPatient.reducer),
    EffectsModule.forFeature([PatientEffects]),
  ],
})
export class PatientStoreModule {}
