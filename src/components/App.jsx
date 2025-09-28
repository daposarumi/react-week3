import { useState } from "react";
import StudentList from "./StudentList"
import GradeInput from "./GradeInput";
import "../../src/styles.css"

export default function App() {
  const [students, setStudents] = useState([
    { name: "Tunde Onigbinde", score: 80 },
    { name: "Roseline Kamoru", score: 90 },
    { name: "Bamise Ganiu", score: 38 },
    { name: "Kenneth Fred", score: 40 },
    { name: "James Igbalola", score: 35 },
    { name: "Taiye Kadri", score: 50 }
  ]);

  const [showScores, setShowScores] = useState(false);

  const addStudent = (name, score) => {
    setStudents([...students, { name, score }]);
  };

  return (
    <div className="container">
      <h1>Student Scoreboard</h1>
      <StudentList students={students} showScores={showScores} />
      <button onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide Scores & Grades" : "Reveal Scores & Grades"}
      </button>
      <GradeInput onAdd={addStudent} />
    </div>
  );
}
