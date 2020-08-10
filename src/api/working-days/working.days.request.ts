import { apiInstance } from '../apiInstance';
import { WorkingDays } from '../../models/WorkingDays';

export async function getAllWorkingDays() {
  try {
    const res = await apiInstance.get('/working-days/list');
    const apiRes = res.data;
    return apiRes.data as WorkingDays[];
  } catch (e) {
    console.error(e);
  }
}
