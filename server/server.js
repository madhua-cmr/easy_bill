import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db/connectDB.js";
import billRoutes from "./routers/billRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import customerRoutes from "./routers/customerRoutes.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin:"https://easy-bill.onrender.com",
  credentials:true
}));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(bodyParser.json());
app.use(cookieParser())
app.use("/api/bills", billRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/user", userRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server running on the port" + process.env.PORT);
  connectDB();
});
