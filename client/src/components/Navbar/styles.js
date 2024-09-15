import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    justifyContent: "space-between", // Keep the brand on the left and toolbar on the right
    alignItems: "center",
    padding: "10px 50px",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 20px",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "auto", // Ensures the brand stays on the far left
  },
  brandLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  brandText: {
    marginRight: "10px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  image: {
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
    justifyContent: "flex-end", // Pushes the toolbar content to the end (far right)
    alignItems: "center",
    marginLeft: "auto", // Ensures the toolbar is at the far right of the Navbar
    width: "auto",
  },
  desktopView: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileView: {
    display: "none",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: "1rem",
    marginLeft: "1rem",
  },
  icon: {
    color: "inherit",
  },
}));