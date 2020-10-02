import { useQuery } from "react-query";
import { getOSessionsList } from "../api/sessions/overlapSessions.request";

export function useGetOSessions() {
  return useQuery("osessions-list", getOSessionsList);
}
