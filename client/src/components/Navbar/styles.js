import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: "10px 20px",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  brandText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
    height: "70px",
    width: "70px",
    [theme.breakpoints.down("sm")]: {
      height: "50px",
      width: "50px",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      justifyContent: "space-between",
      flexGrow: 1,
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: "1rem",
    marginLeft: "2rem",
  },
  mobileView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icon: {
    color: "inherit",
  },
}));
