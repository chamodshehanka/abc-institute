import { useQuery } from "react-query";
import { getAllSessions } from "../api/sessions/sessions.request";

export function useGetSessions() {
  return useQuery("sessions-list", getAllSessions);
}
