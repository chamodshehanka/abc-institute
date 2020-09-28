import { apiInstance } from "../apiInstance";
import { GenerateSubGroupId } from "../../models/GenerateSubGroupId";
import { GenerateSubGroupIdCreateData } from "../interfaces";

export async function addGenerateSubGroupId(
  requestData: GenerateSubGroupIdCreateData
) {
  try {
    const res = await apiInstance.post("/genaraeteSubGroup/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteGenerateSubGroupId(id: string) {
  try {
    const res = await apiInstance.delete("/genaraeteSubGroup/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getGenerateSubGroupIdList() {
  try {
    const res = await apiInstance.get("/genaraeteSubGroup/list");
    const apiRes = res.data;
    return apiRes.data as GenerateSubGroupId[];
  } catch (e) {
    console.error(e);
  }
}
