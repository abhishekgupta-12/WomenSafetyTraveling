import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPRMS from '../NavbarPRMS';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

export default function Userlogin() {
    const navigate = useNavigate();
    const [logdata, setdata] = useState({
        email: "",
        otp: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setdata({
            ...logdata,
            [name]: value
        });
    };

    const senddata = async (e) => {
        e.preventDefault();
        console.log("I am here and verify otp");
        const { email, otp } = logdata;
        const res = await fetch("http://localhost:5000/api/users/verifyOtp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, otp
            })
        });
        const data = await res.json();
        console.log(data);
        localStorage.setItem("userdata", JSON.stringify(data));
        if (res.status === 400 || !data) {
            console.log("invalid details");
            // Replace toast with Material-UI alert or snackbar if needed
            alert("Invalid details");
        } else {
            console.log("data valid");
            // Replace toast with Material-UI alert or snackbar if needed
            alert("Login done successfully");
            setdata({ email: "", otp: "" });
            navigate("/signin/users/login/verifyOtp/userspage");
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5', // Light gray background
                backdropFilter: 'blur(5px)', // Blur effect
                padding: 2,
            }}
        >
            <NavbarPRMS />
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: 3,
                    backgroundColor: '#ffffff', // White background
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    User OTP Verification
                </Typography>
                <form onSubmit={senddata}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={logdata.email}
                        onChange={adddata}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="OTP"
                        variant="outlined"
                        name="otp"
                        type="text"
                        value={logdata.otp}
                        onChange={adddata}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                    >
                        Verify
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
