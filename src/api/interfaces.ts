import { WorkingDays } from '../models/WorkingDays';

export interface WorkingDaysCreateData {
  name: string;
  workingHours: {
    hours: Number;
    mins: Number;
  };
  selectedDays: {
    monday: Boolean;
    tuesday: Boolean;
    wednesday: Boolean;
    thursday: Boolean;
    friday: Boolean;
    saturday: Boolean;
    sunday: Boolean;
  };
  prefferedTimeSlots: {
    thirty: Boolean;
    sixty: Boolean;
  };
}

export interface WorkingDaysUpdateData {
  _id: string;
  name: string;
  workingHours: {
    hours: Number;
    mins: Number;
  };
  selectedDays: {
    monday: Boolean;
    tuesday: Boolean;
    wednesday: Boolean;
    thursday: Boolean;
    friday: Boolean;
    saturday: Boolean;
    sunday: Boolean;
  };
  prefferedTimeSlots: {
    thirty: Boolean;
    sixty: Boolean;
  };
}

export interface WorkingDaysListResponse {
  success: Boolean;
  data: WorkingDays[];
}

export interface TimetableCreateData {
  name: string;
  workingDaysId: string;
  batch: string;
  subGroup: string;
  timetable: [];
}

export interface TimetableUpdateData {
  _id: string;
  name: string;
  workingDaysId: string;
  batch: string;
  subGroup: string;
  timetable: [];
}
