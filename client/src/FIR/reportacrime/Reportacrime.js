import React from 'react';
import { Container, Typography, Grid, Link, Paper, Button } from '@mui/material';
import NavbarUser from '../NavbarUser';

export default function Reportacrime() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', backdropFilter: 'blur(5px)' }}>
            {/* <img className='absolute w-full h-full object-cover mix-blend-overlay' src="" alt="/" /> */}
            <NavbarUser />

            <Container component={Paper} maxWidth="sm" style={{ padding: '2rem', marginTop: '2rem', marginBottom: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    REPORT A CRIME
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Cyber Crime
                        </Typography>
                        <Link href="tel:1234520" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Organized Crime
                        </Typography>
                        <Link href="tel:1234513" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Terrorist Activities
                        </Typography>
                        <Link href="tel:1234514" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Women Help Line
                        </Typography>
                        <Link href="tel:1234516" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Child Help Line
                        </Typography>
                        <Link href="tel:1234517" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            DG Control Room
                        </Typography>
                        <Link href="tel:1234518" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Anti Corruption Bureau
                        </Typography>
                        <Link href="tel:1234512" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Other Crime
                        </Typography>
                        <Link href="tel:1234519" color="primary">
                            Connect For Help
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
