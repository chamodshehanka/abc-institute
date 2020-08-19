import { apiInstance } from '../apiInstance';
import { YearSemester } from '../../models/yearSemester';
import { YearSemesterCreateData, YearSemesterUpdateData } from '../interfaces';

export async function addYearSemester(requestData: YearSemesterCreateData) {
  try {
    const res = await apiInstance.post('/yearSemester/add', requestData);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function updateYearSemester(requestData: YearSemesterUpdateData) {
  try {
    const res = await apiInstance.put(
      '/yearSemester/update/' + requestData._id,
      requestData
    );
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteYearSemester(id: string) {
  try {
    const res = await apiInstance.delete('/yearSemester/delete/' + id);
    const apiRes = res.data;
    return apiRes.success;
  } catch (e) {
    console.error(e);
  }
}

export async function getYearSemesterList() {
  try {
    const res = await apiInstance.get('/yearSemester/list');
    const apiRes = res.data;
    return apiRes.data as YearSemester[];
  } catch (e) {
    console.error(e);
  }
}
