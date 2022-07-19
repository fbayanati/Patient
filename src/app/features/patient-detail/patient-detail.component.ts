import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient, PatientModalData } from 'src/app/store/patient/models';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { StoreState } from 'src/app/store';
import { Store } from '@ngrx/store';

import * as PatientActions from '../../store/patient/patient.actions';

@Component({
  selector: 'pt-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
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

  constructor(
    public dialogRef: MatDialogRef<PatientDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientModalData,
    private fb: FormBuilder,
    private store: Store<StoreState>
  ) {
    console.log(uuidv4());
  }

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

  onPatientUpdate() {}

  onPatientNew() {}
}
