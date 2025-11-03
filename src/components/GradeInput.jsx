import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Alert, Paper } from "@mui/material";

export default function GradeInput({ onAdd, onUpdate, editingStudent }) {
    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
            <Typography variant="h5" gutterBottom>
                {editingStudent ? "Edit Student" : "Add Student"}
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <TextField
                    label="Score"
                    type="number"
                    variant="outlined"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                />

                <Button
                    variant="contained"
                    color={editingStudent ? "secondary" : "primary"}
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? editingStudent
                            ? "Updating..."
                            : "Adding..."
                        : editingStudent
                            ? "Update"
                            : "Add"}
                </Button>
            </Box>

            {message && (
                <Alert severity="success" sx={{ marginTop: 2 }}>
                    {message}
                </Alert>
            )}
        </Paper>
    );
}
