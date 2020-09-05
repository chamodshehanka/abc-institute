import { useQuery } from "react-query";
import { getGroupList } from "../api/student/group.requets";

export function useGetGroup() {
  return useQuery("group-list", getGroupList);
}
