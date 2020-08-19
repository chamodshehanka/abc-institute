import { WorkingDays } from "../models/WorkingDays";

export interface WorkingDaysCreateData {
  name: string;
  workingHours: {
    hours: number;
    mins: number;
  };
  selectedDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  prefferedTimeSlots: {
    thirty: boolean;
    sixty: boolean;
  };
}

export interface WorkingDaysUpdateData {
  _id: string;
  name: string;
  workingHours: {
    hours: number;
    mins: number;
  };
  selectedDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  prefferedTimeSlots: {
    thirty: boolean;
    sixty: boolean;
  };
}

export interface WorkingDaysListResponse {
  success: boolean;
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
