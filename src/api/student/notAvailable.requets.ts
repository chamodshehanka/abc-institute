import { apiInstance } from "../apiInstance";
import { NotAvailable } from "../../models/NotAvailable";
import { NotAvailableCreateData, NotAvailableUpdateData } from "../interfaces";

export async function addNotAvailable(requestData: NotAvailableCreateData) {
  try {
    const res = await apiInstance.post("/NotAvailable/add", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateNotAvailable(requestData: NotAvailableUpdateData) {
  try {
    const res = await apiInstance.put("/NotAvailable/update/", requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteNotAvailable(id: string) {
  try {
    const res = await apiInstance.delete("/NotAvailable/delete/" + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getNotAvailableList() {
  try {
    const res = await apiInstance.get("/NotAvailable/list");
    const apiRes = res.data;
    return apiRes.data as NotAvailable[];
  } catch (e) {
    console.error(e);
  }
}
