import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db/connectDB.js";
import billRoutes from "./routers/billRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import customerRoutes from "./routers/customerRoutes.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path"
const app = express();

app.use(cors({
  origin:"https://easy-bill.onrender.com",
  credentials:true
}));


app.use(bodyParser.json());
app.use(cookieParser())
app.use("/api/bills", billRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/user", userRoutes);
const __dirname=path.resolve()
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/client/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
  })
}

app.listen(process.env.PORT, () => {
  console.log("Server running on the port" + process.env.PORT);
  connectDB();
});
