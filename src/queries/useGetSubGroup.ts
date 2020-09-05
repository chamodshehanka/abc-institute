import { useQuery } from "react-query";
import { getSubGroupList } from "../api/student/subGroup.request";

export function useGetSubGroup() {
  return useQuery("subgroup-list", getSubGroupList);
}
