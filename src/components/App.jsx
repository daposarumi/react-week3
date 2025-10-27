import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  setEditingStudent,
} from "./studentSlice";
import StudentList from "./StudentList";
import GradeInput from "./GradeInput";
import "../../src/styles.css";

export default function App() {
  const dispatch = useDispatch();
  const { list: students, loading, editingStudent } = useSelector((state) => state.students);
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="container">
      <h1>Student Scoreboard</h1>

      <StudentList
        students={students}
        showScores={showScores}
        onDelete={(id) => dispatch(deleteStudent(id))}
        onEdit={(student) => dispatch(setEditingStudent(student))}
      />

      <button onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide Scores & Grades" : "Reveal Scores & Grades"}
      </button>

      <GradeInput
        onAdd={(name, score) => dispatch(addStudent({ name, score }))}
        onUpdate={(id, updatedStudent) => dispatch(updateStudent({ id, updatedStudent }))}
        editingStudent={editingStudent}
      />
    </div>
  );
}
