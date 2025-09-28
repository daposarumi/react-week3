import React from "react"

export default function StudentList({ students, showScores }) {
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
                    <li key={s.name}>
                        {s.name}
                        {showScores && ` — Score: ${s.score}, Grade: ${s.grade}`}
                    </li>
                ))}
            </ol>
        </>
    );
}
