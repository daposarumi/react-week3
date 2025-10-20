import { useState, useEffect } from "react";
import StudentList from "./StudentList";
import GradeInput from "./GradeInput";
import "../../src/styles.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://68e380d08e14f4523dada236.mockapi.io/students";

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchStudents();
  }, []);

  // Add new student
  const addStudent = async (name, score) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
      });
      const data = await res.json();
      setStudents(prev => [...prev, data]);
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Update student
  const updateStudent = async (id, updatedStudent) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
      const data = await res.json();
      setStudents(prev => prev.map(s => s.id === id ? data : s));
      setEditingStudent(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="container">
      <h1>Student Scoreboard</h1>
      <StudentList
        students={students}
        showScores={showScores}
        onDelete={deleteStudent}
        onEdit={setEditingStudent} // sets student to edit
      />
      <button onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide Scores & Grades" : "Reveal Scores & Grades"}
      </button>
      <GradeInput
        onAdd={addStudent}
        onUpdate={updateStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
}
