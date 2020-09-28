import { apiInstance } from "../apiInstance";
import { GenerateGroupId } from "../../models/GenerateGroupId";
import { GenerateGroupIdCreateData } from "../interfaces";

export async function addGenerateGroupId(
  requestData: GenerateGroupIdCreateData
) {
  try {
    const res = await apiInstance.post("/genaraeteGroup/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteGenerateGroupId(id: string) {
  try {
    const res = await apiInstance.delete("/genaraeteGroup/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getGenerateGroupIdList() {
  try {
    const res = await apiInstance.get("/genaraeteGroup/list");
    const apiRes = res.data;
    return apiRes.data as GenerateGroupId[];
  } catch (e) {
    console.error(e);
  }
}
