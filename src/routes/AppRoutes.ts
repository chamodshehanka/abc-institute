import TestPage from '../screens/TestScreen';
import ManageWorkingDaysScreen from '../screens/WorkingDays/ManageWorkingDaysScreen';
import TimetableScreen from '../screens/Timetable/TimetableScreen';

export const routes = [
  { path: '', component: ManageWorkingDaysScreen },
  { path: 'manage-working-days', component: ManageWorkingDaysScreen },
  { path: 'manage-timetables', component: TimetableScreen },
];
