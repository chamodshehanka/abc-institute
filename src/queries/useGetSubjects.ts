import { useQuery } from "react-query";
import { getAllSubjects } from "../api/subjects/subjects.request";

export function useGetSubjects() {
  return useQuery("subjects-list", getAllSubjects);
}
