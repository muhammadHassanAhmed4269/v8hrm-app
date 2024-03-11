require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

const dbConnector = require("./config/database");

const routes = require("./routes/routes");
const checkMacAddress = require("./middlewares/check-mac-address");
app.use(`${process.env.API_VERSION}`, checkMacAddress, routes);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../index.html"));
});

const port = process.env.PORT;
app.listen(port, () => {
  dbConnector;
  console.log("App service is live at port", port);
});
