import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  setEditingStudent,
} from "../../src/studentSlice";
import StudentList from "./StudentList";
import GradeInput from "./GradeInput";
import "../../src/styles.css";
import { Container, Typography, Box, Button } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const { list: students, loading, editingStudent } = useSelector((state) => state.students);
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) return <p>Loading students...</p>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Student Scoreboard
      </Typography>

      <StudentList
        students={students}
        showScores={showScores}
        onDelete={(id) => dispatch(deleteStudent(id))}
        onEdit={(student) => dispatch(setEditingStudent(student))}
      />

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowScores(!showScores)}
        >
          {showScores ? "Hide Scores & Grades" : "Reveal Scores & Grades"}
        </Button>
      </Box>

      <GradeInput
        onAdd={(name, score) => dispatch(addStudent({ name, score }))}
        onUpdate={(id, updatedStudent) => dispatch(updateStudent({ id, updatedStudent }))}
        editingStudent={editingStudent}
      />
    </Container>
  );
}
