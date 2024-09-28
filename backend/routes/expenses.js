const express = require("express");
const router = express.Router();
const {
  getAllExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenses");

router.route("/").post(createExpense).get(getAllExpenses);

router.route("/:id").patch(updateExpense).delete(deleteExpense).get(getExpense);

module.exports = router;
