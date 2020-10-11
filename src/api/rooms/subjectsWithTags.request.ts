import { apiInstance } from "../apiInstance";
import { SubjectsWithTags } from "../../models/SubjectsWithTags";
import { SubjectWithTagsCreateData } from "../interfaces";

export async function addRoomsforSubject(requestData: SubjectWithTagsCreateData) {
  try {
    const res = await apiInstance.post("/subjectsWithTags/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllSubjectsWithTags() {
  try {
    const res = await apiInstance.get("/subjectsWithTags/list");
    const apiRes = res.data;
    return apiRes.data as SubjectsWithTags[];
  } catch (e) {
    console.error(e);
  }
}
