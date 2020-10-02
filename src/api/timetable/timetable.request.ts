import { apiInstance } from "../apiInstance";
import { Timetable } from "../../models/Timetable";
import {
  TimetableCreateData,
  TimetableGenerateData,
  TimetableUpdateData,
} from "../interfaces";

export async function addTimetable(requestData: TimetableCreateData) {
  try {
    const res = await apiInstance.post("/timetable/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateTimetable(requestData: TimetableUpdateData) {
  try {
    const res = await apiInstance.put(
      "/timetable/update/" + requestData._id,
      requestData
    );
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteTimetable(id: string) {
  try {
    const res = await apiInstance.delete("/timetable/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllTimetables() {
  try {
    const res = await apiInstance.get("/timetable/list");
    const apiRes = res.data;
    return apiRes.data as Timetable[];
  } catch (e) {
    console.error(e);
  }
}

export async function generateTimetable(requestData: TimetableGenerateData) {
  try {
    const res = await apiInstance.post("/timetable/generate", requestData);
    const apiRes = res.data;
    console.log(apiRes);
    return true;
  } catch (e) {
    console.error(e);
  }
}
