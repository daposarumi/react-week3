import { useState, useEffect } from "react";
import StudentList from "./StudentList";
import GradeInput from "./GradeInput";
import "../../src/styles.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [showScores, setShowScores] = useState(false);

  // Fetch students (GET)
  useEffect(() => {
    fetch("https://68e380d08e14f4523dada236.mockapi.io/students")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched students:", data);
        setStudents(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add new student (POST)
  const addStudent = async (name, score) => {
    try {
      const res = await fetch("https://68e380d08e14f4523dada236.mockapi.io/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
      });

      const data = await res.json();
      setStudents((prev) => [...prev, data]);
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // Delete student (DELETE)
  const deleteStudent = async (id) => {
    try {
      await fetch(`https://68e380d08e14f4523dada236.mockapi.io/students/${id}`, {
        method: "DELETE",
      });
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Update student (PUT)
  const updateStudent = async (id, updatedData) => {
    try {
      const res = await fetch(`https://68e380d08e14f4523dada236.mockapi.io/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? data : s))
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };



  return (
    <div className="container">
      <h1>Student Scoreboard</h1>
      <StudentList
        students={students}
        showScores={showScores}
        onDelete={deleteStudent}
        onUpdate={updateStudent}
      />
      <button onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide Scores & Grades" : "Reveal Scores & Grades"}
      </button>
      <GradeInput onAdd={addStudent} />
    </div>
  );
}
