import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import NavbarUser from '../NavbarUser';
import Table from './Table';

const Searchmissing = () => {
    const [pdata, sdata] = useState({
        property: "",
        value: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(() => {
            return {
                ...pdata,
                [name]: value
            };
        });
    };

    const [users, setUsers] = useState([]);

    const fetchUserData = async (e) => {
        e.preventDefault();
        const { property, value } = pdata;

        try {
            const response = await fetch(`https://walk-safe-server.onrender.com/api/police/getmissing?${property}=${value}`);
            const data = await response.json();
            setUsers(data.myMissingPerson);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <NavbarUser />
            <Container maxWidth="sm" sx={{ marginTop: 4, marginBottom: 4 }}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Search Missing Person
                    </Typography>
                    <form onSubmit={fetchUserData}>
                        <TextField
                            fullWidth
                            label="Property"
                            variant="outlined"
                            margin="normal"
                            value={pdata.property}
                            name="property"
                            onChange={adddata}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Value"
                            variant="outlined"
                            margin="normal"
                            value={pdata.value}
                            name="value"
                            onChange={adddata}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Search
                        </Button>
                    </form>
                </Paper>
            </Container>
            {users.length > 0 && <Table data={users} />}
        </div>
    );
};

export default Searchmissing;
