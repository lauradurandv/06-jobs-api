import {
  Box,
  createTheme,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Logo from "../assets/logo.png";
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
});

const FrontPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "1em" }}>
        <Box
          sx={{
            padding: "1em",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={Logo} />
          <List>
            <ListItem>
              <ListItemText primary="View Expenses" />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <ListItemText primary="Edit Expenses" />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <ListItemText primary="Delete Expenses" />
            </ListItem>
            <Divider variant="middle" component="li" />
            <ListItem>
              <ListItemText primary="Add Expenses" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default FrontPage;
