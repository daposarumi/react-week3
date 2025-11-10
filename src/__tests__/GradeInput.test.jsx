import { render, screen, fireEvent } from "@testing-library/react";
import GradeInput from "../components/GradeInput";

test("renders GradeInput and updates input values", () => {
    render(<GradeInput onAdd={() => { }} />);

    // MUI uses labels, not placeholders
    const nameInput = screen.getByLabelText(/name/i);
    const scoreInput = screen.getByLabelText(/score/i);
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(scoreInput, { target: { value: "85" } });

    expect(nameInput.value).toBe("John Doe");
    expect(scoreInput.value).toBe("85");
    expect(button).toBeInTheDocument();
});
