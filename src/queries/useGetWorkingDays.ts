import { useQuery } from "react-query";
import { getAllWorkingDays } from "../api/working-days/working.days.request";

export function useGetWorkingDays() {
  return useQuery("working-days-list", getAllWorkingDays);
}
