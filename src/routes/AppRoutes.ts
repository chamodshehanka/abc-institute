import TestPage from '../screens/TestScreen';
import ManageWorkingDaysScreen from '../screens/WorkingDays/ManageWorkingDaysScreen';
import TimetableScreen from '../screens/Timetable/TimetableScreen';
import StudentHomeScreen from '../screens/Student/StudentHomeScreen';
export const routes = [
  { path: '', component: StudentHomeScreen },
  { path: 'manage-working-days', component: ManageWorkingDaysScreen },
  { path: 'manage-timetables', component: TimetableScreen },
  { path: 'StudentHomeScreen', component: StudentHomeScreen },
];
