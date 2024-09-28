import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import styling from "./header.module.css";
const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
  palette: {
    primary: {
      main: "#ffbd59", // orange
      contrastText: "#080357", // dark blue
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          textTransform: "none",
          fontFamily: '"Segoe UI"',
          borderColor: "#080357", // custom outline color
          borderWidth: "2px",
          color: "#080357",
          "&:hover": {
            borderColor: "#ffbd59", // hover color
            backgroundColor: "#080357",
            color: "#ffffff",
          },
        },
      },
    },
  },
});
const Header = ({ isLoggedIn, handleLogout }) => {
  if (isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink className={styling.link} to="/">
                  Bright Budget
                </NavLink>
              </Typography>
              <Button onClick={handleLogout} variant="outlined">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink className={styling.link} to="/">
                  Bright Budget
                </NavLink>
              </Typography>
              <Button style={{ margin: "5px" }} variant="outlined">
                <NavLink to="/register" className={styling.link}>
                  Register
                </NavLink>
              </Button>
              <Button variant="outlined">
                <NavLink to="/login" className={styling.link}>
                  Login
                </NavLink>
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    );
  }
};
export default Header;
