require("dotenv").config();
require("express-async-errors");
//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");
//authentication middleware
const authenticateUser = require("./middleware/authentication");
//routers
const authRouter = require("./routes/auth");
const expensesRouter = require("./routes/expenses");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
//protect routes
app.use("/api/v1/expenses", authenticateUser, expensesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
