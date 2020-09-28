import { useQuery } from "react-query";
import { getGenerateSubGroupIdList } from "../api/student/GenerateSubGroupId.request";

export function useGenerateSubGroupId() {
  return useQuery("GenerateSubGroupId-list", getGenerateSubGroupIdList);
}
