export interface WorkingDays {
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
