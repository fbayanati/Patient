export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  address: string;
  healthCareId: string;
  clinic: string;
}

export interface MapStatePatients {
  totalCount: number;
  patients: Patient[];
  searchPage: number;
}

export interface PatientModalData {
  patient: Patient | undefined;
  isView?: boolean;
  isNew?: boolean;
  isUpdate?: boolean;
  isDelete?: boolean;
}
