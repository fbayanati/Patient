import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { StoreState } from 'src/app/store';
import { Patient } from 'src/app/store/patient/models';

import * as PatientActions from '../../store/patient/patient.actions';
import * as PatientSelectors from '../../store/patient/patient.selectors';

@Component({
  selector: 'pt-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsComponent {
  patientsForPage$: Observable<Patient[]>;
  searchPage$: Observable<number>;
  totalPages$: Observable<number>;

  searchPage = 1;
  totalPage = 0;

  private readonly perPage = 10;

  constructor(private store: Store<StoreState>, private fb: FormBuilder) {
    this.patientsForPage$ = this.store.pipe(
      select(PatientSelectors.selectPatientsForCurrentPage)
    );

    this.searchPage$ = this.store.pipe(
      select(PatientSelectors.selectPatientSearchPage),
      tap((searchPage) => {
        this.searchPage = searchPage;
      })
    );

    this.totalPages$ = this.store.pipe(
      select(PatientSelectors.selectPatientsTotalCount),
      tap((total) => {
        this.totalPage = Math.ceil(total / this.perPage);
      }),
      map((count) => Math.ceil(count / this.perPage))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(
      PatientActions.setPatientSearchPage({ searchPage: this.searchPage })
    );

    this.store.dispatch(PatientActions.loadPatients());
  }

  onFirstPage(): void {
    if (this.searchPage === 1) {
      return;
    }

    this.searchPage = 1;

    this.store.dispatch(
      PatientActions.setPatientSearchPage({ searchPage: this.searchPage })
    );
  }

  onPreviousPage(): void {
    if (this.searchPage <= 1) {
      return;
    }

    this.searchPage -= 1;

    this.store.dispatch(
      PatientActions.setPatientSearchPage({ searchPage: this.searchPage })
    );
  }

  onNextPage(): void {
    if (this.searchPage >= this.totalPage) {
      return;
    }

    this.searchPage += 1;

    this.store.dispatch(
      PatientActions.setPatientSearchPage({ searchPage: this.searchPage })
    );
  }

  onLastPage(): void {
    if (this.searchPage >= this.totalPage) {
      return;
    }

    this.searchPage = this.totalPage;

    this.store.dispatch(
      PatientActions.setPatientSearchPage({ searchPage: this.searchPage })
    );
  }

  get isFirstPageDisabled(): boolean {
    return this.searchPage === 1;
  }

  get isPreviousPageDisabled(): boolean {
    return this.searchPage === 1;
  }

  get isNextPageDisabled(): boolean {
    return this.searchPage === this.totalPage;
  }

  get isLastPageDisabled(): boolean {
    return this.searchPage === this.totalPage;
  }
}
