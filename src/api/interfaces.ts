import { WorkingDays } from '../models/WorkingDays';

export interface WorkingDaysCreateData {
  name: string;
}

export interface WorkingDaysListResponse {
  success: Boolean;
  data: WorkingDays[];
}

export interface YearSemesterCreateData {
  year: string;
  semester: string;
}

export interface YearSemesterUpdateData {
  _id: string;
  year: string;
  semester: string;
}
// export interface Working
