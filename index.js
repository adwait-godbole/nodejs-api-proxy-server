const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 60000, // 1 min
  max: 20,
});
app.use(limiter);
app.set("trust proxy", 1);

// set static folder
app.use(express.static("public"));

// Routes
app.use("/api", require("./routes"));

// Enable cors
app.use(cors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
