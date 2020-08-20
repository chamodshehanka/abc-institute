import { apiInstance } from "../apiInstance";
import { Programme } from "../../models/Programme";
import { ProgrammeCreateData, ProgrammeUpdateData } from "../interfaces";

export async function addProgramme(requestData: ProgrammeCreateData) {
  try {
    const res = await apiInstance.post("/programme/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateProgramme(requestData: ProgrammeUpdateData) {
  try {
    const res = await apiInstance.put(
      "/programme/update/" + requestData._id,
      requestData
    );
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteProgramme(id: string) {
  try {
    const res = await apiInstance.delete("/programme/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getProgrammeList() {
  try {
    const res = await apiInstance.get("/programme/list");
    const apiRes = res.data;
    return apiRes.data as Programme[];
  } catch (e) {
    console.error(e);
  }
}
