import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
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
    border: '2px dashed grey',
    borderRadius: '50%', // Circle border for consistency with Avatar
    width: '1rem', // Match the Avatar size
    height: '1rem', // Match the Avatar size
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto', // Center horizontally
    position: 'relative', // Needed for positioning the IconButton
    overflow: 'hidden', // Hide overflow content
    cursor: 'pointer',
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
    width: '50%',
    lineHeight: '10rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
    },
  },
  hiddenInput: {
    display: 'none',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  input: {
    margin: theme.spacing(1),
    flex: 1,
  },
}));
