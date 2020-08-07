import { apiInstance } from '../apiInstance';
import { WorkingDaysListResponse } from '../interfaces';

export async function getAllWorkingDays() {
  try {
    const res = await apiInstance.get('/working-days/list');
    return res.data as WorkingDaysListResponse;
  } catch (e) {
    console.error(e);
  }
}
