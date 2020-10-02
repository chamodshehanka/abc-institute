import { apiInstance } from "../apiInstance";
import { OSession } from "../../models/overlapSessions";
import { OSessionCreateData } from "../interfaces";

export async function addOSession(requestData: OSessionCreateData) {
  try {
    const res = await apiInstance.post("/osessions/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteOSession(id: string) {
  try {
    const res = await apiInstance.delete("/osessions/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getOSessionsList() {
  try {
    const res = await apiInstance.get("/osessions/list");
    const apiRes = res.data;
    return apiRes.data as OSession[];
  } catch (e) {
    console.error(e);
  }
}
