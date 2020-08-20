import TestPage from "../screens/TestScreen";
import ManageWorkingDaysScreen from "../screens/WorkingDays/ManageWorkingDaysScreen";
import TimetableScreen from "../screens/Timetable/TimetableScreen";
import StudentHomeScreen from "../screens/Student/StudentHomeScreen";
import StudentYearScreen from "../screens/Student/StudentYearScreen";
import ManageLecturersScreen from "../screens/Lecturers/LecturerScreen";
import ProgrammeScreen from "../screens/Programme/ProgrammeScreen";
import WorkingDaysAddEditScreen from "../screens/WorkingDays/WorkingDaysAddEditScreen";
import StatisticScreen from "../screens/Statistics/StatisticScreen";
import LocationsScreen from "../screens/Locations/LocationScreen";

export const routes = [
  { path: "/manage-working-days", component: ManageWorkingDaysScreen },
  { path: "/manage-timetables", component: TimetableScreen },
  { path: "/student-home-screen", component: StudentHomeScreen },
  { path: "/student-year-screen", component: StudentYearScreen },
  { path: "/manage-lecturers", component: ManageLecturersScreen },
  { path: "/working-days-add", component: WorkingDaysAddEditScreen },
  { path: "/programme-screen", component: ProgrammeScreen },
  { path: "/locations-screen", component: LocationsScreen },
  { path: "/statistic-screen", component: StatisticScreen },
  { path: "/test", component: TestPage },
];
