import { useQuery } from "react-query";
import { getAllLecturers } from "../api/lecturers/lecturers.request";

export function useGetLecturers() {
  return useQuery("lecturers-list", getAllLecturers);
}
