import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PatientStoreModule } from './patient/patient-store.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, PatientStoreModule],
})
export class PtStoreModule {}
