import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    Button,
    Stack,
} from "@mui/material";

export default function StudentList({ students, showScores, onDelete, onEdit }) {
    const withGrades = students.map((s) => {
        let grade = "F";
        if (s.score >= 70) grade = "A";
        else if (s.score >= 40) grade = "C";
        return { ...s, grade };
    });

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Students
                </Typography>
                <List>
                    {withGrades.map((s) => (
                        <ListItem
                            key={s.id}
                            secondaryAction={
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => onDelete(s.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={() => onEdit(s)}
                                    >
                                        Edit
                                    </Button>
                                </Stack>
                            }
                        >
                            <Typography>
                                {s.name}
                                {showScores && ` — Score: ${s.score}, Grade: ${s.grade}`}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
