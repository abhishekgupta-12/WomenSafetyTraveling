import React from 'react';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavbarPolice.css'; // Import CSS for styling

const NavbarPolice = () => {
    return (
        <div className="navbar-container">
            <AppBar position="sticky" className="app-bar">
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                            <Link to="/" className="menu-link">Logout</Link>
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Cards Section */}
            <Container maxWidth="lg" className="card-section">
                <Card className="police-card">
                    <CardContent>
                        <Typography variant="h5" component="div" className="card-title">
                            F.I.R.
                        </Typography>
                        <Typography variant="body2" className="card-description">
                            File or search for F.I.R. reports.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" className="card-button" component={Link} to="/signin/police/login/fir">New F.I.R.</Button>
                        <Button size="medium" className="card-button" component={Link} to="/signin/police/searchfirp">Search F.I.R.</Button>
                    </CardActions>
                </Card>

                <Card className="police-card">
                    <CardContent>
                        <Typography variant="h5" component="div" className="card-title">
                            Missing Person Bureau
                        </Typography>
                        <Typography variant="body2" className="card-description">
                            Report or search for missing persons.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" className="card-button" component={Link} to="/signin/police/login/missingpersonbureau">New Case</Button>
                        <Button size="medium" className="card-button" component={Link} to="/signin/police/searchmissingpol">Search Cases</Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    );
};

export default NavbarPolice;