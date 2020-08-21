import { apiInstance } from "../apiInstance";
import { Lecturer } from "../../models/Lecturer";
import { LecturerCreateData, LecturerUpdateData } from "../interfaces";

export async function addLecturer(requestData: LecturerCreateData) {
  try {
    const res = await apiInstance.post("/lecturers/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (error) {
    console.error(error);
  }
}

export async function updateLecturer(requestData: LecturerUpdateData) {
  try {
    const res = await apiInstance.put("/lecturers/update", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteLecturer(id: string) {
  try {
    const res = await apiInstance.delete("/lecturers/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllLecturers() {
  try {
    const res = await apiInstance.get("/lecturers/list");
    const apiRes = res.data;
    return apiRes.data as Lecturer[];
  } catch (e) {
    console.error(e);
  }
}

export async function getLecturerById(id: string) {
  try {
    const res = await apiInstance.get("/lecturers/get/" + id);
    const apiRes = res.data;
    if (res.data.success) {
      return apiRes.data as Lecturer;
    }
  } catch (e) {
    console.error(e);
  }
}
