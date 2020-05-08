const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyparser = require("body-parser");

const app = express();

//database connection
connectDB();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// app.use(express.static(_dirname +"/"));
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:4200"],
    credentials: true,
  })
);
//define routes
app.use("/user", require("./routes/api/user"));
app.use("/auth", require("./routes/api/auth"));
app.use("/class", require("./routes/api/class"));
app.use("/student", require("./routes/api/student"));
app.use("/attendance", require("./routes/api/attendance"));

const PORT = process.env.PORT || 3000;

//listen on port
app.listen(PORT, () => {
  console.log("Server is runnning on port " + PORT);
});
