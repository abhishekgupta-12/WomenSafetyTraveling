import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import NavbarPRMS from '../NavbarPRMS';

const PoliceSignUp = () => {
    const navigate = useNavigate();
    const [pdata, sdata] = useState({
        name: "",
        email: "",
        serviceNumber: "",
        rank: "",
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
    }

    const senddata = async (e) => {
        e.preventDefault();
        const { name, email, serviceNumber, rank, password, cpassword } = pdata;

        try {
            const res = await fetch("https://walk-safe-server.onrender.com/api/police/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, serviceNumber, rank, password, cpassword
                })
            });

            const data = await res.json();
            if (res.status === 400 || !data) {
                setError("Invalid details");
            } else {
                setSuccess("Police signed up successfully");
                sdata({ name: "", email: "", serviceNumber: "", rank: "", password: "", cpassword: "" });
                // Navigate to OTP verification page
                navigate("/signin/police/login");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    }

    return (
        <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
            <Container component="main" maxWidth="xs">
                <Box 
                    sx={{ 
                        marginTop: 8, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        padding: '2rem',
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
                        Police Sign Up
                    </Typography>
                    {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            value={pdata.name}
                            onChange={adddata}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={pdata.email}
                            onChange={adddata}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Service Number"
                            name="serviceNumber"
                            value={pdata.serviceNumber}
                            onChange={adddata}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Rank"
                            name="rank"
                            value={pdata.rank}
                            onChange={adddata}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={pdata.password}
                            onChange={adddata}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            name="cpassword"
                            type="password"
                            value={pdata.cpassword}
                            onChange={adddata}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#1565c0', '&:hover': { backgroundColor: '#0d47a1' } }}
                            onClick={senddata}
                        >
                            Sign Up
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Typography variant="body2">
                                Already signed up?&nbsp;
                            </Typography>
                            <Link
                                variant="body2"
                                onClick={() => navigate("/signin/police/login/")}
                                sx={{ cursor: 'pointer', color: '#1565c0', fontWeight: 'bold' }}
                            >
                                Log In
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default PoliceSignUp;
