import TestPage from "../screens/TestScreen";
import ManageWorkingDaysScreen from "../screens/WorkingDays/ManageWorkingDaysScreen";
import TimetableScreen from "../screens/Timetable/TimetableScreen";
import StudentHomeScreen from "../screens/Student/StudentHomeScreen";
import StudentYearScreen from "../screens/Student/StudentYearScreen";

export const routes = [
  { path: "", component: StudentYearScreen },
  { path: "manage-working-days", component: ManageWorkingDaysScreen },
  { path: "manage-timetables", component: TimetableScreen },
  { path: "StudentHomeScreen", component: StudentHomeScreen },
  { path: "StudentYearScreen", component: StudentYearScreen },
  { path: "test", component: TestPage },
];
