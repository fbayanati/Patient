import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRowComponent } from './patient-row.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PatientDetailModule } from '../patient-detail/patient-detail.module';

@NgModule({
  declarations: [PatientRowComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    PatientDetailModule,
  ],
  exports: [PatientRowComponent],
})
export class PatientRowModule {}
