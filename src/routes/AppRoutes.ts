import TestPage from '../screens/TestScreen';
import ManageWorkingDaysScreen from '../screens/WorkingDays/ManageWorkingDaysScreen';
import ManageLecturersScreen from '../screens/Lecturers/LecturerScreen';

export const routes = [
  { path: '', component: ManageLecturersScreen },
  { path: 'manage-working-days', component: ManageWorkingDaysScreen },
  { path: 'manage-lecturers', component: ManageLecturersScreen },
];
