const express = require("express");
const {
  logErrors,
  respondNoRessourceFound,
} = require("./controller/errorController");
const homeRouter = require("./routes/homeRoute");
const subscribeRouter = require("./routes/subscribeRoute");
const userRouter = require("./routes/userRoute");
const app = express();
const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/";
const dbName = "kitchen_db";
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const cors = require("cors");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`[Mongo connected !!]`))
  .catch((err) => {
    console.log(Error, err.message);
  });

const port = process.env.PORT || 3000;
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(connectFlash());

app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logErrors);
app.use(cors());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use("/", homeRouter);
app.use("/subscribers", subscribeRouter);
app.use("/users", userRouter);
app.use(respondNoRessourceFound);

app.listen(port, () => console.log(`Server is running on port : ${port}`));
