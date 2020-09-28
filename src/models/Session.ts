export interface Session {
  _id: string;
  lecturers: string[];
  tags: string;
  studentGroup: string;
  subject: string;
  subjectCode: string;
  noOfStudents: number;
  duration: number;
}
