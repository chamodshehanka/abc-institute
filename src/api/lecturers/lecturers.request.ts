import { apiInstance } from '../apiInstance';
import { Lecturer } from '../../models/Lecturer';

export async function getAllLecturers() {
  try {
    const res = await apiInstance.get('/lecturers/list');
    const apiRes = res.data;
    return apiRes.data as Lecturer[];
  } catch (e) {
    console.error(e);
  }
}

export async function getLecturerById(id:string) {
  try {
    const res = await apiInstance.get('/lecturers/get/'+id);
    const apiRes = res.data;
    if(res.data.success){
      return apiRes.data as Lecturer;
    }
  } catch (e) {
    console.error(e);
  }
}