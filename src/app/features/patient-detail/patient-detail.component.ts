import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient, PatientModalData } from 'src/app/store/patient/models';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { StoreState } from 'src/app/store';
import { Store } from '@ngrx/store';

import * as PatientActions from '../../store/patient/patient.actions';
import { Update } from '@ngrx/entity';
import { map, Observable, of, startWith } from 'rxjs';
import { clinics } from './config';

@Component({
  selector: 'pt-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailComponent implements OnInit {
  patientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: [''],
    email: ['', Validators.required],
    healthCareId: ['', Validators.required],
    clinic: ['', Validators.required],
  });

  filteredOptions$!: Observable<string[]>;
  options = clinics;

  constructor(
    public dialogRef: MatDialogRef<PatientDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientModalData,
    private fb: FormBuilder,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    if (
      this.data.patient &&
      (this.data.isView || this.data.isUpdate || this.data.isDelete)
    ) {
      this.patientForm.controls['firstName'].setValue(
        this.data.patient.firstName
      );
      this.patientForm.controls['lastName'].setValue(
        this.data.patient.lastName
      );
      this.patientForm.controls['address'].setValue(this.data.patient.address);
      this.patientForm.controls['email'].setValue(this.data.patient.email);
      this.patientForm.controls['healthCareId'].setValue(
        this.data.patient.healthCareId
      );
      this.patientForm.controls['clinic'].setValue(this.data.patient.clinic);
    }

    this.filteredOptions$ = this.patientForm.controls[
      'clinic'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isReadOnly(): boolean {
    return (this.data?.isView ?? false) || (this.data?.isDelete ?? false);
  }

  onPatientDelete() {
    if (this.data?.patient?.id) {
      this.store.dispatch(
        PatientActions.deletePatient({ id: this.data.patient.id })
      );
    }
  }

  onPatientUpdate() {
    const patient: Patient = {
      id: this.data.patient?.id ?? '',
      firstName: this.patientForm.controls['firstName'].value ?? '',
      lastName: this.patientForm.controls['lastName'].value ?? '',
      email: this.patientForm.controls['email'].value ?? '',
      address: this.patientForm.controls['address'].value ?? '',
      healthCareId: this.patientForm.controls['healthCareId'].value ?? '',
      clinic: this.patientForm.controls['clinic'].value ?? '',
    };

    const patientUpdate: Update<Patient> = {
      id: patient.id,
      changes: patient,
    };

    this.store.dispatch(PatientActions.updatePatient({ patientUpdate }));
  }

  onPatientNew() {
    const patient: Patient = {
      id: uuidv4(),
      firstName: this.patientForm.controls['firstName'].value ?? '',
      lastName: this.patientForm.controls['lastName'].value ?? '',
      email: this.patientForm.controls['email'].value ?? '',
      address: this.patientForm.controls['address'].value ?? '',
      healthCareId: this.patientForm.controls['healthCareId'].value ?? '',
      clinic: this.patientForm.controls['clinic'].value ?? '',
    };

    this.store.dispatch(PatientActions.addPatient({ patient }));
  }
}
