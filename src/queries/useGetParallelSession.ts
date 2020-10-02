import { useQuery } from "react-query";
import { getPSessionsList } from "../api/sessions/parallelSessions.request";

export function useGetPSessions() {
  return useQuery("psessions-list", getPSessionsList);
}
