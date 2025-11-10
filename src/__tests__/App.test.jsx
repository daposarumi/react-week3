// src/__tests__/App.test.jsx
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../studentSlice";
import App from "../components/App";

// Create a mock store with initial data
const store = configureStore({
    reducer: {
        students: studentsReducer,
    },
    preloadedState: {
        students: {
            list: [
                { id: "1", name: "John Doe", score: 80 },
                { id: "2", name: "Jane Doe", score: 65 },
            ],
            loading: false,
            editingStudent: null,
        },
    },
});

test("renders Student Scoreboard header", async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    // Now the header should appear immediately
    const header = screen.getByText(/Student Scoreboard/i);
    expect(header).toBeInTheDocument();
});
