import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Button, Typography, IconButton } from "@material-ui/core";
import { Help, Message, Notifications } from "@mui/icons-material";
import memoriesLogo from '../../images/memoriesLogo.jpg';
import memoriesText from '../../images/memoriesText.png';
import useStyles from "./styles";
import { jwtDecode } from 'jwt-decode';
import UserProfileWidget from '../../widgets/UserWidget'; // Import the new widget component

const defaultAvatar = '/path/to/defaultAvatar.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [showProfileWidget, setShowProfileWidget] = useState(false); // State to control widget visibility
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setShowProfileWidget(!showProfileWidget); // Toggle the widget visibility
  };

  const handleCloseWidget = () => {
    setShowProfileWidget(false);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        // Logout logic is not needed
        // You can handle token expiration here, such as redirecting to login
        navigate('/auth');
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, navigate]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          src={memoriesText}
          alt="icon"
          height="45px"
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <>
            <IconButton sx={{ ml: 2 }} className={classes.help}>
              <Help />
            </IconButton>
            <IconButton sx={{ ml: 2 }} className={classes.message}>
              <Message />
            </IconButton>
            <IconButton sx={{ ml: 2 }} className={classes.notification}>
              <Notifications />
            </IconButton>

            <Typography variant="h6" sx={{ ml: 3 }}>
              {user.result.name}
            </Typography>

            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              onClick={handleAvatarClick}
              src={user?.result.picturePath ? `/images/${user.result.picturePath}` : defaultAvatar}
            >
              {!user?.result.picturePath && user?.result.name.charAt(0)}
            </Avatar>

            {showProfileWidget && <UserProfileWidget onClose={handleCloseWidget} />}
          </>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
