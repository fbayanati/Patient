import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient, PatientModalData } from 'src/app/store/patient/models';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';

@Component({
  selector: 'pt-patient-row',
  templateUrl: './patient-row.component.html',
  styleUrls: ['./patient-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientRowComponent {
  @Input() patient: Patient | undefined;
  @Input() index: number = 0;

  isMouseOver = false;

  constructor(public dialog: MatDialog) {}

  openViewDialog(): void {
    const patientModalData: PatientModalData = {
      patient: this.patient,
      isView: true,
    };

    const dialogRef = this.dialog.open(PatientDetailComponent, {
      data: patientModalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO :: whatever necessary
    });
  }

  openDeleteDialog(): void {
    const patientModalData: PatientModalData = {
      patient: this.patient,
      isDelete: true,
    };

    const dialogRef = this.dialog.open(PatientDetailComponent, {
      data: patientModalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO :: whatever necessary
    });
  }

  openUpdateDialog(): void {
    const patientModalData: PatientModalData = {
      patient: this.patient,
      isUpdate: true,
    };

    const dialogRef = this.dialog.open(PatientDetailComponent, {
      data: patientModalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO :: whatever necessary
    });
  }

  @HostBinding('class.pt-mat-card-background-white') get isWhiteCard() {
    return !this.isMouseOver && (this.index ?? 0) % 2 == 0;
  }

  @HostBinding('class.pt-mat-card-background-lightblue') get isLightBlueCard() {
    return this.isMouseOver;
  }

  @HostListener('mouseover') onMouseOver() {
    this.isMouseOver = true;
  }

  @HostListener('mouseout') onMouseOut() {
    this.isMouseOver = false;
  }

  get patientName(): string {
    return this.patient
      ? `${this.patient.firstName.trim()} ${this.patient.lastName.trim()}`
      : '';
  }
}
