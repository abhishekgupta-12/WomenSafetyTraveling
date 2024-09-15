import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import NavbarPRMS from '../NavbarPRMS';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PoliceLogin() {
    const navigate = useNavigate();
    const [logdata, setdata] = useState({
        email: "",
        password: "",
        serviceNumber: ""
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
        const { email, password, serviceNumber } = logdata;
    
        try {
            const res = await fetch("https://walk-safe-server.onrender.com/api/police/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, serviceNumber }),
            });
    
            const data = await res.json();
            console.log(data)
            
            if (res.status === 200 && data) {
                console.log("senddata");
                setSnackbarMessage("Login successful");
                // setSnackbarSeverity("success");
              
                setdata({ email: "", password: "", serviceNumber: "" });
             
                localStorage.setItem("policedata", JSON.stringify(data));
                navigate("/signin/police/login/policepage");
            } else {
                setSnackbarMessage(data?.message || "Invalid details");
                setSnackbarSeverity("warning");
             
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            console.error("Login error:", error);
        }
    };
    

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
         
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Police Login
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
                    <TextField
                        label="Service Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="serviceNumber"
                        value={logdata.serviceNumber}
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
                        Don't have an account? Sign up now
                    </Typography>
                    <NavLink to="/signin/police/login/police/register">
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
