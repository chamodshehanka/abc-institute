import TestPage from "../screens/TestScreen";
import ManageWorkingDaysScreen from "../screens/WorkingDays/ManageWorkingDaysScreen";
import TimetableScreen from "../screens/Timetable/TimetableScreen";
import StudentHomeScreen from "../screens/Student/StudentHomeScreen";
import StudentYearScreen from "../screens/Student/StudentYearScreen";
import ManageLecturersScreen from "../screens/Lecturers/LecturerScreen";
import ProgrammeScreen from "../screens/Programme/ProgrammeScreen";
import WorkingDaysAddEditScreen from "../screens/WorkingDays/WorkingDaysAddEditScreen";
import GroupScreen from "../screens/Group/GroupScreen";
import TagsScreen from "../screens/Tags/TagsScreen";
import StatisticScreen from "../screens/Statistics/StatisticScreen";
import LocationsScreen from "../screens/Locations/LocationScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ManageSubjectsScreen from "../screens/Subjects/ManageSubjectsScreen";

export const routes = [
  { path: "/", component: HomeScreen },
  { path: "/manage-working-days", component: ManageWorkingDaysScreen },
  { path: "/manage-timetables", component: TimetableScreen },
  { path: "/student-year-screen", component: StudentYearScreen },
  { path: "/student-home-screen", component: StudentHomeScreen },
  { path: "/manage-lecturers", component: ManageLecturersScreen },
  { path: "/manage-subjects", component: ManageSubjectsScreen },
  { path: "/working-days-add", component: WorkingDaysAddEditScreen },
  { path: "/programme-screen", component: ProgrammeScreen },
  { path: "/group-screen", component: GroupScreen },
  { path: "/tags-screen", component: TagsScreen },
  { path: "/locations-screen", component: LocationsScreen },
  { path: "/statistic-screen", component: StatisticScreen },
  { path: "/test", component: TestPage },
];
