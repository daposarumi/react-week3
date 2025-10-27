import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://68e380d08e14f4523dada236.mockapi.io/students";

// ✅ GET all students
export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
    const res = await fetch(API_URL);
    return await res.json();
});

// ✅ POST new student
export const addStudent = createAsyncThunk("students/add", async ({ name, score }) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
    });
    return await res.json();
});

// ✅ DELETE student
export const deleteStudent = createAsyncThunk("students/delete", async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return id;
});

// ✅ PUT (update) student
export const updateStudent = createAsyncThunk("students/update", async ({ id, updatedStudent }) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
    });
    return await res.json();
});

const studentSlice = createSlice({
    name: "students",
    initialState: {
        list: [],
        loading: true,
        editingStudent: null,
    },
    reducers: {
        setEditingStudent: (state, action) => {
            state.editingStudent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.list = state.list.filter((s) => s.id !== action.payload);
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.list = state.list.map((s) => (s.id === action.payload.id ? action.payload : s));
                state.editingStudent = null;
            });
    },
});

export const { setEditingStudent } = studentSlice.actions;
export default studentSlice.reducer;
