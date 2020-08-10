import { apiInstance } from '../apiInstance';
import { Timetable } from '../../models/Timetable';

export async function getAllTimetables() {
  try {
    const res = await apiInstance.get('/timetable/list');
    const apiRes = res.data;
    return apiRes.data as Timetable[];
  } catch (e) {
    console.error(e);
  }
}
