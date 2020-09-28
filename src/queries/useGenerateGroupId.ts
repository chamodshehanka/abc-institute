import { useQuery } from "react-query";
import { getGenerateGroupIdList } from "../api/student/GenerateGroupId.request";

export function useGenerateGroupId() {
  return useQuery("GenerateGroupId-list", getGenerateGroupIdList);
}
