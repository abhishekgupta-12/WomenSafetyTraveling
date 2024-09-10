import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  IconButton,
  Snackbar, // Import Snackbar
   // Import Alert
} from "@material-ui/core";
import { Alert } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import FlexBetween from "../FlexBetween";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  pictureUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
    cursor: 'pointer',
    border: '2px dashed grey',
    borderRadius: '50%', // Circle border for consistency with Avatar
    width: '10rem', // Match the Avatar size
    height: '10rem', // Match the Avatar size
    position: 'relative', // Needed for positioning the IconButton
    overflow: 'hidden', // Hide overflow content
    [theme.breakpoints.down('sm')]: {
      width: '8rem',
      height: '8rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '6rem',
      height: '6rem',
    },
  },
  pictureText: {
    margin: 0,
    textAlign: 'center',
    width: '100%',
    lineHeight: '10rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
  },
  hiddenInput: {
    display: 'none',
  },
}));


const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  picture: '', 
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    if (isSignUp) {
      dispatch(signup(form, navigate)).catch((error) => {
        if (error?.response?.data?.message === "User already exists") {
          setErrorMessage("User already exists!"); // Set error message
          setOpenSnackbar(true); // Show Snackbar
        }
      });
    } else {
      dispatch(signin(form, navigate)).catch((error) => {
        if (error?.response?.data?.message === "Invalid credentials") {
          setErrorMessage("Incorrect email or password!"); // Set error message
          setOpenSnackbar(true); // Show Snackbar
        }
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDrop = (acceptedFiles) => {
    setFormData({ ...formData, picture: acceptedFiles[0] });
    setPreview(URL.createObjectURL(acceptedFiles[0])); 
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar after it’s displayed
  };

  const onSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (error) => {
    console.log("Google sign in failed! ... Try again later.", error);
  };

  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          {isSignUp ?  "" :
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          }
          <Typography variant="h5">
            {isSignUp ? "Sign Up" : "Log In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Box
                    className={classes.pictureUpload}
                    {...getRootProps()}
                    sx={{
                      height: "3.5rem",
                      width: "3.5rem",
                      marginLeft: "9.5rem",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f0f0f0",
                    }}
                  >
                    <input {...getInputProps()} className={classes.hiddenInput} />
                    {preview ? (
                      <Avatar
                        src={preview}
                        sx={{ width: '100%', height: '100%' }}
                      />
                    ) : (
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          bgcolor: 'rgba(0,0,0,0.5)',
                          ":hover": {
                            bgcolor: 'rgba(0,0,0,0.7)',
                          },
                          color: '#ff4081',
                        }}
                        component="label"
                      >
                        <CameraAltIcon sx={{ color: '#ff4081' }} />
                      </IconButton>
                    )}
                  </Box>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Sign in with Google 🚀
                </Button>
              )}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode} style={{
                  fontWeight:"bold",
                  color:"red",
                  fontSize:"0.6rem",
                  marginTop:"0.5rem"
                }}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;

