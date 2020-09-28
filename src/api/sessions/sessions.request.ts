import { apiInstance } from "../apiInstance";
import { Session } from "../../models/Session";
import { SessionCreateData, SessionUpdateData } from "../interfaces";

export async function addSession(requestData: SessionCreateData) {
  try {
    const res = await apiInstance.post("/sessions/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSession(requestData: SessionUpdateData) {
  try {
    const res = await apiInstance.put("/sessions/update", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSession(id: string) {
  try {
    const res = await apiInstance.delete("/sessions/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllSessions() {
  try {
    const res = await apiInstance.get("/sessions/list");
    const apiRes = res.data;
    return apiRes.data as Session[];
  } catch (e) {
    console.error(e);
  }
}

export async function getSessionById(id: string) {
  try {
    const res = await apiInstance.get("/sessions/get/" + id);
    const apiRes = res.data;
    if (res.data.success) {
      return apiRes.data as Session;
    }
  } catch (e) {
    console.error(e);
  }
}
