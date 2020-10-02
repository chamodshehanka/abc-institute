import { useQuery } from "react-query";
import { getCSessionsList } from "../api/sessions/consecutiveSessions.request";

export function useGetCSessions() {
  return useQuery("csessions-list", getCSessionsList);
}
