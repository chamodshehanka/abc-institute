import { Timeslot } from "../models/Timeslot";

export function getTimeslotByTimeAndDate(
  timeslot: Timeslot[],
  startTime: string,
  day: string
) {
  return timeslot?.find((t) => startTime === t?.startTime && day === t?.day);
}
