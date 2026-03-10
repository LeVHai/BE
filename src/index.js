import express from "express";
import databaseService from "./services/databaseService.js";
import { config } from "dotenv";
import usersRouter from "./routes/usersRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser"
import { defaultErrorHandler } from "./middlewares/errorMiddleware.js";
import cors from 'cors'
config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());
databaseService.connect();
app.use("/user", usersRouter);
app.use("/product", productRouter);
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
