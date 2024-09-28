import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  createTheme,
  ThemeProvider,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  Box,
  Typography,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  addExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from "../services/api";
import { useEffect, useState } from "react";

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

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [openAddDialogue, setOpenAddDialogue] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetchExpenses();
        setExpenses(response);
      } catch (error) {
        console.error(error);
      }
    };
    getExpenses();
  }, []);

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleEdit = (row) => {
    setEditRowId(row._id);
    setCategory(row.category);
    setDescription(row.description);
    setAmount(row.amount);
  };

  const handleSave = async (rowId) => {
    const bodyData = {
      category: category,
      amount: amount,
      description: description,
    };

    try {
      await updateExpense(rowId, bodyData);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetchExpenses();
      setExpenses(response);
    } catch (error) {
      console.error(error);
    }
    setEditRowId(null);
  };

  const handleDeleteOpenDialogue = (rowId) => {
    setOpenDeleteDialogue(true);
    const row = expenses.find((expense) => expense._id === rowId);
    setSelectedExpense(row);
  };

  const handleDeleteCloseDialogue = () => {
    setOpenDeleteDialogue(!openDeleteDialogue);
  };

  const handleAddOpenDialogue = () => {
    setOpenAddDialogue(true);
  };

  const handleAddCloseDialogue = () => {
    setOpenAddDialogue(!openAddDialogue);
  };
  const handleDelete = async () => {
    try {
      await deleteExpense(selectedExpense._id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== selectedExpense._id)
      );
      setOpenDeleteDialogue(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddAmount = (event) => {
    setNewAmount(event.target.value);
  };

  const handleAddDescription = (event) => {
    setNewDescription(event.target.value);
  };

  const handleAddingExpense = () => {
    const bodyData = {
      category: newCategory,
      amount: newAmount,
      description: newDescription,
    };
    const createExpense = async () => {
      setDisplayMessage("");
      try {
        await addExpense(bodyData);
        setDisplayMessage("Expenses Added.");
        const response = await fetchExpenses();
        setOpenAddDialogue(false);
        setNewCategory("");
        setNewAmount(0);
        setNewDescription("");
        setExpenses(response);
        setDisplayMessage("");
      } catch (error) {
        console.error(error);
      }
    };

    createExpense();
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {editRowId === row._id ? (
                    <>
                      <InputLabel id="category">Category</InputLabel>
                      <Select
                        required
                        labelId="catergory"
                        id="category"
                        value={category}
                        label="category"
                        onChange={handleCategory}
                      >
                        <MenuItem value={"Wants"}>Wants</MenuItem>
                        <MenuItem value={"Needs"}>Needs</MenuItem>
                        <MenuItem value={"Savings"}>Savings</MenuItem>
                      </Select>
                    </>
                  ) : (
                    row.category
                  )}
                </TableCell>
                <TableCell align="right">
                  {editRowId === row._id ? (
                    <TextField
                      required
                      id="amount"
                      label="Amount"
                      variant="outlined"
                      type="number"
                      value={amount}
                      onChange={handleAmount}
                    />
                  ) : (
                    row.amount
                  )}
                </TableCell>
                <TableCell align="right">
                  {editRowId === row._id ? (
                    <TextField
                      required
                      id="description"
                      label="Description"
                      variant="outlined"
                      type="text"
                      value={description}
                      onChange={handleDescription}
                    />
                  ) : (
                    row.description
                  )}
                </TableCell>
                <TableCell>
                  {editRowId === row._id ? (
                    <Button
                      variant="outlined"
                      onClick={() => handleSave(row._id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button variant="outlined" onClick={() => handleEdit(row)}>
                      Edit
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon
                      onClick={() => handleDeleteOpenDialogue(row._id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog onClose={handleDeleteCloseDialogue} open={openDeleteDialogue}>
        <DialogTitle>Are you want to delete this expense?</DialogTitle>
        <Box p={2} textAlign="left">
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Expense
          </Typography>
          <Typography variant="body1" gutterBottom>
            Category: {selectedExpense.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Amount: {selectedExpense.amount}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {selectedExpense.description}
          </Typography>
        </Box>
        <Button onClick={handleDelete} variant="contained">
          Yes
        </Button>
      </Dialog>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab size="large" color="primary" aria-label="add">
          <AddIcon onClick={handleAddOpenDialogue} />
          <Dialog onClose={handleAddCloseDialogue} open={openAddDialogue}>
            <DialogTitle>New Expense</DialogTitle>
            <Box p={2} textAlign="left">
              <InputLabel id="add-category">Category</InputLabel>
              <Select
                required
                labelId="Catergory"
                id="add-category"
                value={newCategory}
                label="Category"
                onChange={handleAddCategory}
              >
                <MenuItem value={"Wants"}>Wants</MenuItem>
                <MenuItem value={"Needs"}>Needs</MenuItem>
                <MenuItem value={"Savings"}>Savings</MenuItem>
              </Select>
              <TextField
                required
                id="add-amount"
                label="Amount"
                variant="outlined"
                type="number"
                value={newAmount}
                fullWidth
                margin="normal"
                onChange={handleAddAmount}
              />
              <TextField
                required
                id="add-description"
                label="Description"
                variant="outlined"
                value={newDescription}
                fullWidth
                margin="normal"
                onChange={handleAddDescription}
              />
              <Button variant="contained" onClick={handleAddingExpense}>
                Add
              </Button>
              {displayMessage ? displayMessage : displayMessage}
            </Box>
          </Dialog>
        </Fab>
      </Box>
    </ThemeProvider>
  );
};
export default Dashboard;
