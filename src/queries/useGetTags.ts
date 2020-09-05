import { useQuery } from "react-query";
import { getTagsList } from "../api/student/tags.request";

export function useGetTags() {
  return useQuery("Tags-list", getTagsList);
}
