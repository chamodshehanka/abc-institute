import { getAllTimeslots } from "../api/timeslots/timeslot.request";
import { useQuery } from "react-query";

export function useGetTimeslots() {
  return useQuery("timeslot-list", getAllTimeslots);
}
