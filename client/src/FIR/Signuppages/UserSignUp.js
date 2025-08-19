import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, Grid, Link, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import BackgroundImage from './background.jpg'; // Assume you have a background image

const theme = createTheme();

const UserSignUp = () => {
    const navigate = useNavigate();
    const [udata, sdata] = useState({
        name: "",
        email: "",
        aadhar: "",
        password: "",
        cpassword: "",
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const senddata = async (e) => {
        e.preventDefault();
        const { name, email, aadhar, password, cpassword } = udata;

        try {
            const res = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, aadhar, password, cpassword
                })
            });

            const data = await res.json();
            if (res.status === 400 || !data) {
                setError("Invalid details");
            } else {
                setSuccess("User signed up successfully");
                sdata({ name: "", email: "", aadhar: "", password: "", cpassword: "" });
                navigate("/signin/users/login/verifyOtp/userspage");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid 
                container 
                component="main" 
                sx={{
                    height: '100vh',
                    backgroundImage: 'white',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <Container component="main" maxWidth="xs">
                    <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography component="h1" variant="h5" color="primary" fontWeight="bold">
                                User Sign Up
                            </Typography>
                            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={udata.name}
                                    onChange={adddata}
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={udata.email}
                                    onChange={adddata}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Aadhar Number"
                                    name="aadhar"
                                    value={udata.aadhar}
                                    onChange={adddata}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={udata.password}
                                    onChange={adddata}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    name="cpassword"
                                    type="password"
                                    value={udata.cpassword}
                                    onChange={adddata}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={senddata}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Typography variant="body2">
                                            Already have an account?{' '}
                                            <Link href="/signin/users/login/" variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                                                Login here
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Grid>
        </ThemeProvider>
    );
};

export default UserSignUp;
