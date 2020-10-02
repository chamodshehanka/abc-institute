import { apiInstance } from "../apiInstance";
import { CSession } from "../../models/consecutiveSessions";
import { CSessionCreateData } from "../interfaces";

export async function addCSession(requestData: CSessionCreateData) {
  try {
    const res = await apiInstance.post("/csessions/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteCSession(id: string) {
  try {
    const res = await apiInstance.delete("/csessions/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getCSessionsList() {
  try {
    const res = await apiInstance.get("/csessions/list");
    const apiRes = res.data;
    return apiRes.data as CSession[];
  } catch (e) {
    console.error(e);
  }
}
