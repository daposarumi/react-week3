import { useState, useEffect } from "react";
import StudentList from "./StudentList";
import GradeInput from "./GradeInput";
import "../../src/styles.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://68e380d08e14f4523dada236.mockapi.io/students";

  // Fetch students (GET)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Add student (POST)
  const addStudent = async (name, score) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
      });
      const newStudent = await res.json();
      setStudents((prev) => [...prev, newStudent]);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete student (DELETE)
  const deleteStudent = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
