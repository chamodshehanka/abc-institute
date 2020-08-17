import TestPage from '../screens/TestScreen';
import ManageWorkingDaysScreen from '../screens/WorkingDays/ManageWorkingDaysScreen';
import TimetableScreen from '../screens/Timetable/TimetableScreen';
import WorkingDaysAddEditScreen from '../screens/WorkingDays/WorkingDaysAddEditScreen';

export const routes = [
  { path: '', component: WorkingDaysAddEditScreen },
  { path: 'working-days-form', component: WorkingDaysAddEditScreen },
  { path: 'manage-working-days', component: ManageWorkingDaysScreen },
  { path: 'manage-timetables', component: TimetableScreen },
];
