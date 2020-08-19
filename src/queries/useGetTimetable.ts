import { useQuery } from "react-query";
import { getAllTimetables } from "../api/timetable/timetable.request";

export function useGetTimetable() {
  return useQuery("timetable-list", getAllTimetables);
}
