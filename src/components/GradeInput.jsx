import { useState } from "react";

export default function GradeInput({ onAdd }) {
    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !score) return;

        setLoading(true);
        setMessage("");
        try {
            await onAdd(name, parseInt(score));
            setMessage("Student added successfully!");
            setName("");
            setScore("");
        } catch (err) {
            console.error(err);
            setMessage("Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>Add Student</h2>
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
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
        </>
    );
}
