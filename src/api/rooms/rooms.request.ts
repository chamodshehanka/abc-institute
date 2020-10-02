import { apiInstance } from "../apiInstance";
import { Rooms } from "../../models/Rooms";
import { RoomsCreateData, RoomsUpdateData } from "../interfaces";

export async function addRooms(requestData: RoomsCreateData) {
  try {
    const res = await apiInstance.post("/rooms/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateRooms(requestData: RoomsUpdateData) {
  try {
    const res = await apiInstance.put("/rooms/update", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteRooms(id: string) {
  try {
    const res = await apiInstance.delete("/rooms/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllRooms() {
  try {
    const res = await apiInstance.get("/rooms/list");
    const apiRes = res.data;
    return apiRes.data as Rooms[];
  } catch (e) {
    console.error(e);
  }
}
