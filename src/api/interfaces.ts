import { WorkingDays } from '../models/WorkingDays';

export interface WorkingDaysCreateData {
  name: string;
}

export interface WorkingDaysListResponse {
  success: Boolean;
  data: WorkingDays[];
}

// export interface Working
