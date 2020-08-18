import { apiInstance } from '../apiInstance';
import { yearSemester } from '../../models/yearSemester';

export async function getAllYearSemester() {
  try {
    const res = await apiInstance.get('/yearSemester/list');
    const apiRes = res.data;
    return apiRes.data as yearSemester[];
  } catch (e) {
    console.error(e);
  }
}
