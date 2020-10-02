import { useQuery } from "react-query";
import { getNotAvailableList } from "../api/student/notAvailable.requets";

export function useNotAvailable() {
  return useQuery("notAvailable-list", getNotAvailableList);
}
