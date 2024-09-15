import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import NavbarPRMS from '../NavbarPRMS';

export default function Missingperson() {
    const navigate = useNavigate();
    const [logdata, setdata] = useState({
        name: "",
        age: "",
        place: "",
        aadhar: "",
        description: "",
        personreporting: "",
        found: ""
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const adddata = (e) => {
        const { name, value } = e.target;
        setdata({
            ...logdata,
            [name]: value
        });
    };

    const senddata = async (e) => {
        e.preventDefault();
        const { name, age, place, aadhar, description, personreporting, found } = logdata;
        try {
            const res = await fetch("https://walk-safe-server.onrender.com/api/police/registermissing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, age, place, aadhar, description, personreporting, found
                })
            });
            const data = await res.json();
            localStorage.setItem("missingpersondata", JSON.stringify(data));
            if (res.status === 400 || !data) {
                setSnackbarMessage("Invalid details");
                setSnackbarSeverity("warning");
            } else {
                setSnackbarMessage("Details submitted successfully");
                setSnackbarSeverity("success");
                setdata({ name: "", age: "", place: "", aadhar: "", description: "", personreporting: "", found: "" });
                navigate("/");
            }
        } catch (error) {
            setSnackbarMessage("An error occurred");
            setSnackbarSeverity("error");
        }
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
            <NavbarPRMS />
            <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Missing Person Bureau
                </Typography>
                <form onSubmit={senddata}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={logdata.name}
                        onChange={adddata}
                    />
                    <TextField
                        label="Age"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="age"
                        value={logdata.age}
                        onChange={adddata}
                    />
                    <TextField
                        label="Place"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="place"
                        value={logdata.place}
                        onChange={adddata}
                    />
                    <TextField
                        label="Aadhar Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="aadhar"
                        value={logdata.aadhar}
                        onChange={adddata}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        name="description"
                        value={logdata.description}
                        onChange={adddata}
                    />
                    <TextField
                        label="Person Reporting"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="personreporting"
                        value={logdata.personreporting}
                        onChange={adddata}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
