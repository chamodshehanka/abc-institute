export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DAYS = typeof days[number];

export interface WorkingDays {
  _id: string;
  name: string;
  workingHours: Record<DAYS, { hours: number; mins: number }>;
  selectedDays: Record<DAYS, boolean>;
  prefferedTimeSlots: {
    thirty: boolean;
    sixty: boolean;
  };
}

export type WORKING_HOURS = Array<[DAYS, { hours: number; mins: number }]>;

export interface WorkingDaysFormData {
  _id: string;
  name: string;
  workingHours: Record<DAYS, { hours: string; mins: string }>;
  selectedDays: Record<DAYS, boolean>;
  prefferedTimeSlots: {
    thirty: boolean;
    sixty: boolean;
  };
}
