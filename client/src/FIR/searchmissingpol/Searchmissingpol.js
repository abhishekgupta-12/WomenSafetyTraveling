import React, { useState } from "react";
import Table from "./Table";
import NavbarPolice from "../NavbarPolice";
import { Container, Typography, TextField, Button, Paper } from '@mui/material';

const Searchmissingpol = () => {
    const [pdata, sdata] = useState({
        property: "",
        value: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        sdata({
            ...pdata,
            [name]: value
        });
    };

    const [users, setUsers] = useState([]);

    const fetchUserData = async (e) => {
        e.preventDefault();
        const { property, value } = pdata;

        await fetch(`http://localhost:5000/api/police/getmissing?${property}=${value}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.myMissingPerson);
            });
    };

    return (
        <div className="relative w-full h-screen backdrop-blur">
            <NavbarPolice />
            <Container component="main" maxWidth="md" style={{ marginTop: '2rem' }}>
                <Paper elevation={3} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Search Missing Person
                    </Typography>
                    <form onSubmit={fetchUserData} style={{ width: '100%', marginTop: '1rem' }}>
                        <TextField
                            label="Property"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="property"
                            value={pdata.property}
                            onChange={adddata}
                        />
                        <TextField
                            label="Value"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="value"
                            value={pdata.value}
                            onChange={adddata}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '1rem' }}
                        >
                            Search
                        </Button>
                    </form>
                </Paper>
            </Container>
            {users.length > 0 && <Table data={users} />}
        </div>
    );
}

export default Searchmissingpol;
