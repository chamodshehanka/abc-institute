import { apiInstance } from "../apiInstance";
import { Subject } from "../../models/Subject";
import { SubjectCreateData, SubjectUpdateData } from "../interfaces";

export async function addSubject(requestData: SubjectCreateData) {
  try {
    const res = await apiInstance.post("/subjects/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateSubject(requestData: SubjectUpdateData) {
  try {
    const res = await apiInstance.put("/subjects/update/", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteSubject(id: string) {
  try {
    const res = await apiInstance.delete("/subjects/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllSubjects() {
  try {
    const res = await apiInstance.get("/subjects/list");
    const apiRes = res.data;
    return apiRes.data as Subject[];
  } catch (e) {
    console.error(e);
  }
}
