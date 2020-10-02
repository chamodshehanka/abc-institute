import { apiInstance } from "../apiInstance";
import { PSession } from "../../models/parallelSession";
import { PSessionCreateData } from "../interfaces";

export async function addPSession(requestData: PSessionCreateData) {
  try {
    const res = await apiInstance.post("/psessions/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deletePSession(id: string) {
  try {
    const res = await apiInstance.delete("/psessions/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getPSessionsList() {
  try {
    const res = await apiInstance.get("/psessions/list");
    const apiRes = res.data;
    return apiRes.data as PSession[];
  } catch (e) {
    console.error(e);
  }
}
