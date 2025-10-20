import React from "react";

export default function StudentList({ students, showScores, onDelete, onEdit }) {
    const withGrades = students.map(s => {
        let grade;
        if (s.score >= 70) grade = "A";
        else if (s.score >= 40) grade = "C";
        else grade = "F";
        return { ...s, grade };
    });

    return (
        <>
            <h2>Students</h2>
            <ol>
                {withGrades.map(s => (
                    <li key={s.id}>
                        {s.name}
                        {showScores && ` — Score: ${s.score}, Grade: ${s.grade}`}
                        <button
                            onClick={() => onEdit(s)}
                            style={{ marginLeft: "10px", background: "#ffc107", color: "white", border: "none", padding: "5px 8px", borderRadius: "4px", cursor: "pointer" }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(s.id)}
                            style={{ marginLeft: "10px", background: "#dc3545", color: "white", border: "none", padding: "5px 8px", borderRadius: "4px", cursor: "pointer" }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
}
