const { required } = require("joi");
const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Needs", "Wants", "Savings"],
      default: "Personal",
      required: [true, "Please select a category"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount."],
    },
    description: {
      type: String,
      required: false,
      maxlength: 60,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
