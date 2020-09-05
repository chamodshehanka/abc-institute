import { apiInstance } from "../apiInstance";
import { Group } from "../../models/Group";
import { GroupCreateData, GroupUpdateData } from "../interfaces";

export async function addGroup(requestData: GroupCreateData) {
  try {
    const res = await apiInstance.post("/group/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateGroup(requestData: GroupUpdateData) {
  try {
    const res = await apiInstance.put(
      "/group/update/" + requestData._id,
      requestData
    );
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteGroup(id: string) {
  try {
    const res = await apiInstance.delete("/group/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getGroupList() {
  try {
    const res = await apiInstance.get("/group/list");
    const apiRes = res.data;
    return apiRes.data as Group[];
  } catch (e) {
    console.error(e);
  }
}
