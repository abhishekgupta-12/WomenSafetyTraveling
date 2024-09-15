import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import Table from "./Table";
import NavbarUser from "../NavbarUser";

const Searchfir = () => {
    const [pdata, sdata] = useState({
        FIRno: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(() => {
            return {
                ...pdata,
                [name]: value
            }
        });
    };

    const [users, setUsers] = useState([]);

    const fetchUserData = async (e) => {
        e.preventDefault();
        const { FIRno } = pdata;

        await fetch(`https://walk-safe-server.onrender.com/api/users/getfir?FIRno=${FIRno}`)
            .then(response => response.json())
            .then(data => {
                console.log(data[0]);
                setUsers(data[0]);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <>
            <div style={{ position: 'relative', width: '100%', height: '100vh', backdropFilter: 'blur(5px)' }}>
                <NavbarUser />
                <Container component={Paper} maxWidth="sm" style={{ padding: '2rem', marginTop: '2rem' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Search F.I.R.
                    </Typography>
                    <form onSubmit={fetchUserData}>
                        <Grid container spacing={3} direction="column" alignItems="center">
                            <Grid item xs={12}>
                                <TextField
                                    label="FIRno"
                                    variant="outlined"
                                    fullWidth
                                    value={pdata.FIRno}
                                    onChange={adddata}
                                    name="FIRno"
                                    placeholder="Enter FIR no."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                {users?.length !== 0 && <Table data={users} />}
            </div>
        </>
    );
}

export default Searchfir;
