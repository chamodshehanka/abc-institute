import { apiInstance } from "../apiInstance";
import { YearSemester } from "../../models/yearSemester";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getAllYearSemester() {
  try {
    const res = await apiInstance.get("/yearSemester/list");
    const apiRes = res.data;
    return apiRes.data as YearSemester[];
  } catch (e) {
    console.error(e);
  }
}
