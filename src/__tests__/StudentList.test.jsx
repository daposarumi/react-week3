import { render, screen } from "@testing-library/react";
import StudentList from "../components/StudentList";

test("renders student list with grades", () => {
    const students = [
        { id: "1", name: "John Doe", score: 85 },
        { id: "2", name: "Jane Smith", score: 42 },
    ];

    render(<StudentList students={students} showScores={true} onDelete={() => { }} onEdit={() => { }} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 85/i)).toBeInTheDocument();
});
