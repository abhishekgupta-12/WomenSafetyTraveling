import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import NavbarPolice from '../NavbarPolice';
import Table from './Table';

const Searchfirp = () => {
    const [pdata, sdata] = useState({
        FIRno: "",
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(() => ({
            ...pdata,
            [name]: value
        }));
    };

    const [users, setUsers] = useState([]);

    const fetchUserData = async (e) => {
        e.preventDefault();
        const { FIRno } = pdata;

        try {
            const response = await fetch(`http://localhost:5000/api/users/getfir?FIRno=${FIRno}`);
            const data = await response.json();
            setUsers(data[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'rgba(128, 128, 128, 0.2)', // Light gray with opacity
                backdropFilter: 'blur(5px)', // Blurring effect
                padding: 2,
            }}
        >
            <NavbarPolice />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 1,
                        boxShadow: 1,
                    }}
                >
                    <Typography variant="h5">Search FIR</Typography>
                    <Box component="form" noValidate onSubmit={fetchUserData} sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Enter FIR no."
                            variant="outlined"
                            value={pdata.FIRno}
                            onChange={adddata}
                            name="FIRno"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
            </Container>
            {users?.length !== 0 && <Table data={users} />}
        </Box>
    );
};

export default Searchfirp;
