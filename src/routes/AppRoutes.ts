import TestPage from "../screens/TestScreen";
import ManageWorkingDaysScreen from "../screens/WorkingDays/ManageWorkingDaysScreen";
import TimetableScreen from "../screens/Timetable/TimetableScreen";
import StudentHomeScreen from "../screens/Student/StudentHomeScreen";
import StudentYearScreen from "../screens/Student/StudentYearScreen";
import ManageLecturersScreen from "../screens/Lecturers/LecturerScreen";
import ProgrammeScreen from "../screens/Programme/ProgrammeScreen";

export const routes = [
  { path: "", component: StudentYearScreen },
  { path: "manage-working-days", component: ManageWorkingDaysScreen },
  { path: "manage-timetables", component: TimetableScreen },
  { path: "StudentHomeScreen", component: StudentHomeScreen },
  { path: "StudentYearScreen", component: StudentYearScreen },
  { path: "manage-lecturers", component: ManageLecturersScreen },
  { path: "ProgrammeScreen", component: ProgrammeScreen },
  { path: "test", component: TestPage },
];
