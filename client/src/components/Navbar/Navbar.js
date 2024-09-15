import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Button, Typography, IconButton, Menu, MenuItem, Dialog } from "@material-ui/core";
import { Menu as MenuIcon, Add as AddIcon, Notifications } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import memoriesLogo from '../../images/memoriesLogo.jpg';
import memoriesText from '../../images/memoriesText.png';
import useStyles from "./styles";
import { jwtDecode } from 'jwt-decode';
import UserProfileWidget from '../../widgets/UserWidget';
import Tooltip from '@mui/material/Tooltip';
import Form from '../../components/Form/Form';
import InfoIcon from '@mui/icons-material/Info';
import RoomIcon from '@mui/icons-material/Room';
import HelpWidget from "../../widgets/HelpWidget";

const defaultAvatar = '/path/to/defaultAvatar.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [showProfileWidget, setShowProfileWidget] = useState(false);
  const [showHelpWidget, setShowHelpWidget] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const widgetRef = useRef(null);

  const handleAddClick = () => {
    setShowForm(!showForm);
  };

  const handleAvatarClick = () => {
    setShowProfileWidget(!showProfileWidget);
    setShowHelpWidget(false);

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
    setShowProfileWidget(false);

  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlefirclick = () => {
    navigate('/fir');

  };

  const handlemapclick = () => {
    navigate('/map');

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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (widgetRef.current && !widgetRef.current.contains(event.target)) {
  //       handleCloseWidget(); // Close the widget if the click is outside the widget
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/" className={classes.brandLink}>
          <img src={memoriesText} alt="icon" height="45px" className={classes.brandText} />
          <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <>
            <div className={classes.desktopView}>
              <Tooltip title="News">
                <IconButton sx={{ ml: 2 }} className={classes.icon} onClick={handlenewsclick}>
                  <NewspaperIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Help">
                <IconButton sx={{ ml: 2 }} className={classes.icon} onClick={handlehelpclick}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>

              {showHelpWidget && (
                <div ref={widgetRef}>
                  <HelpWidget onClose={handleCloseWidget} />
                </div>
              )}

              <Tooltip title="Crime Report">
                <IconButton sx={{ ml: 2 }} className={classes.icon} onClick={handlefirclick}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Map">
                <IconButton sx={{ ml: 2 }} className={classes.icon} onClick={handlemapclick}>
                  <RoomIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Notification">
                <IconButton sx={{ ml: 2 }} className={classes.icon}>
                  <Notifications />
                </IconButton>
              </Tooltip>

              <Typography variant="h6" sx={{ ml: 3 }} style={{fontWeight:"bold"}}>
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
            </div>

            <div className={classes.mobileView}>

            <Tooltip title="Help">
                <IconButton sx={{ ml: 2 }} className={classes.icon} onClick={handlehelpclick}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>

              {showHelpWidget && (
                <div ref={widgetRef}>
                  <HelpWidget onClose={handleCloseWidget} />
                </div>
              )}

              <Tooltip title="Post">
                <IconButton edge="start" className={classes.icon} color="inherit" onClick={handleAddClick}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
          
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                onClick={handleAvatarClick}
                src={user?.result.picturePath ? user.result.picturePath : defaultAvatar}
              >
                {!user?.result.picturePath && user?.result.name.charAt(0)}
              </Avatar>

              {showProfileWidget && (
                <div ref={widgetRef}>
                  <UserProfileWidget onClose={handleCloseWidget} />
                </div>
              )}

              <IconButton
                edge="start"
                className={classes.icon}
                color="inherit"
                onClick={anchorEl ? handleCloseMenu : handleMenuClick}>
                {anchorEl ? <CloseIcon /> : <MenuIcon />}
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                className={classes.menu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                style={{ marginTop: '50px' }}
              >
                <MenuItem className={classes.menuItem}>
                  <Typography variant="h6" sx={{ ml: 3 }} style={{fontWeight:"bold"}}>
                    {user.result.name}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handlenewsclick} className={classes.menuItem}><NewspaperIcon />News</MenuItem>

                <MenuItem onClick={handlefirclick} className={classes.menuItem}><InfoIcon />Crime Report</MenuItem>
                <MenuItem onClick={handlemapclick} className={classes.menuItem}><RoomIcon />Map</MenuItem>
                <MenuItem className={classes.menuItem}><Notifications />Notification</MenuItem>
              </Menu>
            </div>
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

      <Dialog open={showForm} onClose={handleAddClick} className={classes.dialog}>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Dialog>
    </AppBar>
  );
}

export default Navbar;
