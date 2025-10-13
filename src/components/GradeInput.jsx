import React, { useState, useRef } from "react";

export default function GradeInput({ onAdd }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const nameRef = useRef();
    const scoreRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value.trim();
        const score = parseInt(scoreRef.current.value);

        if (!name || isNaN(score)) return;

        setLoading(true);
        setMessage("");

        await onAdd(name, score);
        nameRef.current.value = "";
        scoreRef.current.value = "";
        setLoading(false);
        setMessage("Student added successfully!");
    };

    return (
        <>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" ref={nameRef} />
                <input type="number" placeholder="Score" ref={scoreRef} />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add"}
                </button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
        </>
    );
}
