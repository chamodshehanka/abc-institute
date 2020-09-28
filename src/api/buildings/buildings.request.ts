import { apiInstance } from "../apiInstance";
import { Buildings } from "../../models/Buildings";
import { BuildingsCreateData, BuildingUpdateData } from "../interfaces";

export async function addBuilding(requestData: BuildingsCreateData) {
  try {
    const res = await apiInstance.post("/buildings/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateBuilding(requestData: BuildingUpdateData) {
  try {
    const res = await apiInstance.put("/buildings/update", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteBuilding(id: string) {
  try {
    const res = await apiInstance.delete("/buildings/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllBuildings() {
  try {
    const res = await apiInstance.get("/buildings/list");
    const apiRes = res.data;
    return apiRes.data as Buildings[];
  } catch (e) {
    console.error(e);
  }
}
