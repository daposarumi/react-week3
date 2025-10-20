import React, { useState, useEffect } from "react";

export default function GradeInput({ onAdd, onUpdate, editingStudent }) {
    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Prefill form if editing
    useEffect(() => {
        if (editingStudent) {
            setName(editingStudent.name);
            setScore(editingStudent.score);
        }
    }, [editingStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || score === "") return;

        setLoading(true);
        setMessage("");

        if (editingStudent) {
            await onUpdate(editingStudent.id, { name, score: parseInt(score) });
            setMessage("Student updated successfully!");
        } else {
            await onAdd(name, parseInt(score));
            setMessage("Student added successfully!");
        }

        setName("");
        setScore("");
        setLoading(false);
    };

    return (
        <>
            <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? (editingStudent ? "Updating..." : "Adding...") : editingStudent ? "Update" : "Add"}
                </button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
        </>
    );
}
