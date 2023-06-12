require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");

const connectDB = require("./database/db");
const { seedAdmin } = require("./database/seedAdmin");

connectDB();
seedAdmin()

const app = express();
app.use(cors());
app.use(express.json());

//Routes

app.use("/auth", require("./routes/Auth"));
app.use("/courier", require("./routes/Courier"));
app.use("/offer", require("./routes/Offer"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
