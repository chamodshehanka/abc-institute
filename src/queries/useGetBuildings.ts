import { useQuery } from "react-query";
import { getAllBuildings } from "../api/buildings/buildings.request";

export function useGetBuildings() {
  return useQuery("buildings", getAllBuildings);
}
