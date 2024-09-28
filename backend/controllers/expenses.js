const Expense = require("../models/Expense");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ expenses, count: expenses.length });
};

const createExpense = async (req, res) => {
  //adding property
  req.body.createdBy = req.user.userId;
  const expense = await Expense.create(req.body);
  res.status(StatusCodes.CREATED).json({ expense });
};

const getExpense = async (req, res) => {
  //user id coming from token
  //expense id coming from params
  const {
    user: { userId },
    params: { id: expenseId },
  } = req;
  //find expense
  const expense = await Expense.findOne({
    _id: expenseId,
    createdBy: userId,
  });
  if (!expense) {
    throw new NotFoundError(`No expense with id ${expenseID} `);
  }
  res.status(StatusCodes.OK).json({ expense });
};

const updateExpense = async (req, res) => {
  const {
    body: { description, amount, category },
    user: { userId },
    params: { id: expenseId },
  } = req;

  if (description === "" || category === "" || amount === null) {
    throw new BadRequestError(
      "Description, category and or amount cannot be empty."
    );
  }

  const expense = await Expense.findByIdAndUpdate(
    {
      _id: expenseId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!expense) {
    throw new BadRequestError(`Expense with id ${expenseId} not found`);
  }
  res.status(StatusCodes.OK).json({ expense });
};

const deleteExpense = async (req, res) => {
  const {
    user: { userId },
    params: { id: expenseId },
  } = req;

  const expense = await Expense.findOneAndRemove({
    _id: expenseId,
    createdBy: userId,
  });

  if (!expense) {
    throw new BadRequestError(`Expense with id ${expenseId} not found`);
  }

  res
    .status(StatusCodes.OK)
    .send(`Expense with id ${expenseId} has been deleted`);
};
module.exports = {
  getAllExpenses,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
