import { useQuery } from 'react-query';
import { getYearSemesterList } from '../api/student/year.request';

export function useGetYearSemester() {
  return useQuery('year-semester-list', getYearSemesterList);
}
