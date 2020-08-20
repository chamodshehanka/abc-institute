import { useQuery } from "react-query";
import { getProgrammeList } from "../api/student/programme.request";

export function useGetProgramme() {
  return useQuery("programme-list", getProgrammeList);
}
