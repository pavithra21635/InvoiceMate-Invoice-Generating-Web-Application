const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");


dotenv.config();
connectDB();

const app = express();

app.use(cors({
    credentials: true,
  }));
app.use(express.json());

app.use("/api/invoices", require("./src/routes/invoiceRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
