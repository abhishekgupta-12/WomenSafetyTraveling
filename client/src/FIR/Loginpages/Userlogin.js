import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import NavbarPRMS from '../NavbarPRMS';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Userlogin() {
    const navigate = useNavigate();
    const [logdata, setdata] = useState({
        email: "",
        password: ""
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
        const { email, password } = logdata;
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            localStorage.setItem("userdata", JSON.stringify(data));
            if (res.status === 400 || !data) {
                setSnackbarMessage("Invalid details");
                setSnackbarSeverity("warning");
                // setOpenSnackbar(true);
            } else {
                console.log("login ho gya")
                setSnackbarMessage("Login successful");
                setSnackbarSeverity("success");
                // setOpenSnackbar(true);
                setdata({ email: "", password: "" });
                console.log("kya hal hai")
                navigate("/signin/users/login/verifyOtp/userspage");
            }
        } catch (error) {
            setSnackbarMessage("An error occurred");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
          
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    User Login
                </Typography>
                <form onSubmit={senddata}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={logdata.email}
                        onChange={adddata}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={logdata.password}
                        onChange={adddata}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Not a member? Sign up now
                    </Typography>
                    <NavLink to="/signin/users/login/users/register">
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Sign Up
                        </Button>
                    </NavLink>
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
