import { TimeslotCreateData } from "../interfaces";
import { apiInstance } from "../apiInstance";
import { Timeslot } from "../../models/Timeslot";

export async function addTimeslot(requestData: TimeslotCreateData) {
  try {
    const res = await apiInstance.post("/timeslot/add", requestData);
    const apiRes = res.data;

    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllTimeslots() {
  try {
    const res = await apiInstance.get("/timeslot/list");
    const apiRes = res.data;
    return apiRes.data as Timeslot[];
  } catch (e) {
    console.error(e);
  }
}
