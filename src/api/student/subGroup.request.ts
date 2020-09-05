import { apiInstance } from "../apiInstance";
import { SubGroup } from "../../models/SubGroup";
import { SubGroupCreateData, SubGroupUpdateData } from "../interfaces";

export async function addSubGroup(requestData: SubGroupCreateData) {
  try {
    const res = await apiInstance.post("/subGroup/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateSubGroup(requestData: SubGroupUpdateData) {
  try {
    const res = await apiInstance.put("/subGroup/update/", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteSubGroup(id: string) {
  try {
    const res = await apiInstance.delete("/subGroup/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getSubGroupList() {
  try {
    const res = await apiInstance.get("/subGroup/list");
    const apiRes = res.data;
    return apiRes.data as SubGroup[];
  } catch (e) {
    console.error(e);
  }
}
