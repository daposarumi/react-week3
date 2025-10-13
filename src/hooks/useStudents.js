import { useState, useEffect } from "react";

const API_URL = "https://68e380d08e14f4523dada236.mockapi.io/students";

export default function useStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch students
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    // Add student
    const addStudent = async (name, score) => {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, score }),
        });
        const data = await res.json();
        setStudents((prev) => [...prev, data]);
    };

    // Delete student
    const deleteStudent = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setStudents((prev) => prev.filter((s) => s.id !== id));
    };

    return { students, loading, addStudent, deleteStudent };
}
