import { useQuery } from "react-query";
import { getAllRooms } from "../api/rooms/rooms.request";

export function useGetRooms() {
  return useQuery("rooms", getAllRooms);
}
