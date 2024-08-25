import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Button, Typography, Select, MenuItem, InputBase, FormControl, IconButton } from "@material-ui/core";
import { Help, Message, Notifications } from "@mui/icons-material"; // Import the message and notification icons
import memoriesLogo from '../../images/memoriesLogo.jpg';
import memoriesText from '../../images/memoriesText.png';
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';

const defaultAvatar = '/path/to/defaultAvatar.png'; // Update with your default image path

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, navigate]); // Correct dependency array

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
            {/* Add message and notification buttons */}
            <IconButton sx={{ ml: 2 }} className={classes.help}>
              <Help />
            </IconButton>
            <IconButton sx={{ ml: 20 }}className={classes.message}>
              <Message />
            </IconButton>
            <IconButton sx={{ ml: 2 }} className={classes.notification}>
              <Notifications />
            </IconButton>
           
           
            <FormControl variant="standard" sx={{ ml: 3 }}>
              <Select
                value={user.result.name}
                onChange={() => { }} // Empty onChange handler
                sx={{
                  backgroundColor: '',
                  width: "200px", // Increased width
                  borderRadius: "0.25rem",
                  p: "0.25rem 0.5rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: '#f0f0f0',
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={user.result.name}>
                  <Typography>{user.result.name}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={logout}
                  sx={{
                    color: 'white', // Text color
                    backgroundColor: 'red', // Background color for the logout button
                    '&:hover': {
                      backgroundColor: '#cc0000', // Darker shade on hover
                    },
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>

            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.picturePath ? `/images/${user.result.picturePath}` : defaultAvatar}
            >
              {!user?.result.picturePath && user?.result.name.charAt(0)}
            </Avatar>
          
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
