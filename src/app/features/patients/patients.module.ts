import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PatientRowModule } from '../patient-row/patient-row.module';
import { MatCardModule } from '@angular/material/card';
import { PatientDetailModule } from '../patient-detail/patient-detail.module';

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    PatientRowModule,
    PatientDetailModule,
  ],
})
export class PatientsModule {}
