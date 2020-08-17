import { apiInstance } from '../apiInstance';
import { WorkingDays } from '../../models/WorkingDays';
import { WorkingDaysCreateData, WorkingDaysUpdateData } from '../interfaces';

export async function addWorkingDays(requestData: WorkingDaysCreateData) {
  try {
    const res = await apiInstance.post('/working-days/add', requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateWorkingDays(requestData: WorkingDaysUpdateData) {
  try {
    const res = await apiInstance.put(
      '/working-days/update/' + requestData._id,
      requestData
    );
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllWorkingDays() {
  try {
    const res = await apiInstance.get('/working-days/list');
    const apiRes = res.data;
    return apiRes.data as WorkingDays[];
  } catch (e) {
    console.error(e);
  }
}
