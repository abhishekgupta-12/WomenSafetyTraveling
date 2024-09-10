import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Button, Typography, IconButton } from "@material-ui/core";
import { Notifications } from "@mui/icons-material";
import HelpIcon from '@mui/icons-material/Help';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import memoriesLogo from '../../images/memoriesLogo.jpg';
import memoriesText from '../../images/memoriesText.png';
import useStyles from "./styles";
import { jwtDecode } from 'jwt-decode';
import UserProfileWidget from '../../widgets/UserWidget';
import Tooltip from '@mui/material/Tooltip';
import HelpWidget from "../../widgets/HelpWidget";

const defaultAvatar = '/path/to/defaultAvatar.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [showProfileWidget, setShowProfileWidget] = useState(false);
  const [showHelpWidget, setShowHelpWidget] = useState(false);
  const navigate = useNavigate();
  const widgetRef = useRef(null);

  const handleAvatarClick = () => {
    setShowProfileWidget(!showProfileWidget);
    setShowHelpWidget(false); // Close help widget if user widget is opened
  };

  const handleCloseWidget = () => {
    setShowProfileWidget(false);
    setShowHelpWidget(false);
  };

  const handlenewsclick = () => {
    navigate('/newsapp');
  };

  const handlehelpclick = () => {
    setShowHelpWidget(!showHelpWidget);
    setShowProfileWidget(false); // Close user widget if help widget is opened
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        navigate('/auth');
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        handleCloseWidget();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <Tooltip title="News">
              <IconButton sx={{ ml: 2 }} className={classes.help} onClick={handlenewsclick}>
                <NewspaperIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Help">
              <IconButton sx={{ ml: 2 }} className={classes.message} onClick={handlehelpclick}>
                <HelpIcon />
              </IconButton>
            </Tooltip>

            {showHelpWidget && (
              <div ref={widgetRef}>
                <HelpWidget onClose={handleCloseWidget} />
              </div>
            )}

            <Tooltip title="Notification">
              <IconButton sx={{ ml: 2 }} className={classes.notification}>
                <Notifications />
              </IconButton>
            </Tooltip>

            <Typography variant="h6" sx={{ ml: 3 }}>
              {user.result.name}
            </Typography>

            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              onClick={handleAvatarClick}
              src={user?.result.picturePath ? user.result.picturePath : defaultAvatar} // Use Cloudinary URL directly
            >
              {!user?.result.picturePath && user?.result.name.charAt(0)}
            </Avatar>


            {showProfileWidget && (
              <div ref={widgetRef}>
                <UserProfileWidget onClose={handleCloseWidget} />
              </div>
            )}
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
