const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

//Body Parser
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const db = config.get("mongoURI");

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV == "production") {
  //Set static folder
  app.use(express.static("crud-app-react/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "crud-app-react", "build", "index.html"));
  });
}
//Routes
app.use("/api/register", require("./routes/api/register"));
app.use("/api/admin-register", require("./routes/api/admin-register"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/admin-login", require("./routes/api/admin-login"));
app.use("/api/auth", require("./routes/api/auth-user"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/sports-club", require("./routes/api/sports-club"));
app.use("/api/sport", require("./routes/api/sport"));
app.use("/api/member", require("./routes/api/member"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
