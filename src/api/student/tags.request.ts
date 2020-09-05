import { apiInstance } from "../apiInstance";
import { Tags } from "../../models/Tags";
import { TagsCreateData, TagsUpdateData } from "../interfaces";

export async function addTags(requestData: TagsCreateData) {
  try {
    const res = await apiInstance.post("/tags/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateTags(requestData: TagsUpdateData) {
  try {
    const res = await apiInstance.put("/tags/update/", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteTags(id: string) {
  try {
    const res = await apiInstance.delete("/tags/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getTagsList() {
  try {
    const res = await apiInstance.get("/tags/list");
    const apiRes = res.data;
    return apiRes.data as Tags[];
  } catch (e) {
    console.error(e);
  }
}
