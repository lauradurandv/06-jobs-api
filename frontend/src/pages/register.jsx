import {
  TextField,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import { useState } from "react";
import { registerUser } from "../services/api";

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
    MuiStack: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          alignItems: "center",
          padding: "1em",
        },
      },
    },
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
            backgroundColor: "#ffbd59",
            color: "#ffffff",
          },
        },
      },
    },
  },
});

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const handleName = (e) => {
    const input = e.target.value;
    setUser((user) => ({
      ...user,
      name: input,
    }));
  };

  const handleEmail = (e) => {
    const input = e.target.value;
    setUser((user) => ({
      ...user,
      email: input,
    }));
  };

  const handlePassword = (e) => {
    const input = e.target.value;
    setUser((user) => ({
      ...user,
      password: input,
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(user);
      if (response.success === false) {
        setError(!error);
        setDisplayMessage(response.message);
      }
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("user", JSON.stringify(response.user.name));
      setDisplayMessage("Registration succesful, Please login in.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack component="form" spacing={2} noValidate autoComplete="off">
        <Typography>Get started</Typography>
        <TextField
          id="outlined-basic"
          defaultValue={user.name}
          label="Name"
          variant="outlined"
          onChange={handleName}
        />
        <TextField
          id="outlined-basic"
          defaultValue={user.email}
          label="Email"
          variant="outlined"
          onChange={handleEmail}
        />
        <TextField
          id="outlined-basic"
          defaultValue={user.password}
          label="Password"
          variant="outlined"
          type="password"
          onChange={handlePassword}
        />
        <Button onClick={handleRegister} variant="outlined">
          Sign up
        </Button>
        {error ? displayMessage : displayMessage}
      </Stack>
    </ThemeProvider>
  );
};
export default Register;
