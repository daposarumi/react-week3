import React, { useState } from "react";
import StudentList from "./StudentList";
import GradeInput from "./GradeInput";
import useStudents from "../hooks/useStudents";
import "../../src/styles.css";

export default function App() {
  const { students, loading, addStudent, deleteStudent } = useStudents();
  const [showScores, setShowScores] = useState(false);

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="container">
      <h1>Student Scoreboard</h1>
      <StudentList
        students={students}
        showScores={showScores}
        onDelete={deleteStudent}
      />
      <button onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide Scores & Grades" : "Reveal Scores & Grades"}
      </button>
      <GradeInput onAdd={addStudent} />
    </div>
  );
}
