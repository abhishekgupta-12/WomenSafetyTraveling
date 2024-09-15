// NavbarUser.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Card, CardContent, CardActions, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './NavbarUser.css'; // Importing the CSS file

const NavbarUser = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="navbar-container">
            <AppBar position="sticky" className="app-bar">
                <Container maxWidth="lg">
                    <Toolbar>
                        <div>
                            <Typography variant="body1">
                                <Link to="/" className="menu-link">Logout</Link>
                            </Typography>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Cards Section */}
            <Container maxWidth="lg" className="card-section">
                <Card className="user-card">
                    <CardContent>
                        <Typography variant="h5" component="div" className="card-title">
                            Report a Crime
                        </Typography>
                        <Typography variant="body2" className="card-description">
                            Securely report any crime with our easy-to-use platform.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" className="card-button" component={Link} to="/signin/users/reportacrime">Go to Report</Button>
                    </CardActions>
                </Card>

                <Card className="user-card">
                    <CardContent>
                        <Typography variant="h5" component="div" className="card-title">
                            Search F.I.R.
                        </Typography>
                        <Typography variant="body2" className="card-description">
                            Access and search F.I.R. records quickly and efficiently.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" className="card-button" component={Link} to="/signin/users/searchfir">Go to F.I.R.</Button>
                    </CardActions>
                </Card>

                <Card className="user-card">
                    <CardContent>
                        <Typography variant="h5" component="div" className="card-title">
                            Missing Person Bureau
                        </Typography>
                        <Typography variant="body2" className="card-description">
                            Find missing persons using our comprehensive search tool.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" className="card-button" component={Link} to="/signin/users/searchmissing">Go to Search</Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    );
};

export default NavbarUser;