import express from "express"
import cors from "cors"
import router from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
  console.log("👉 Request aayi:", req.method, req.url);
  next();
});
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://192.168.43.143:5173",
    "https://admin-dashboard-rose-tau-43.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser())
app.use("/",router);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
