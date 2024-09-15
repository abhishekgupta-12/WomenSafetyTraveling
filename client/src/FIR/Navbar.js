import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#ff9c1bfe', borderBottom: '4px solid white' }}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>PRMS</Link>
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                        sx={{ display: { xs: 'block', lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link to="/signin" style={{ textDecoration: 'none', color: '#0B2447' }}>Sign In</Link>
                        </MenuItem>
                    </Menu>
                    <div style={{ display: 'none', flexGrow: 1, justifyContent: 'flex-end', gap: '1rem', color: 'white', display: { xs: 'none', lg: 'flex' } }}>
                        <Button color="inherit">
                            <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>Sign In</Link>
                        </Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
