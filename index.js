import express from "express"
import cors from "cors"
import router from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  credentials: true
}));
app.use((req, res, next) => {
  console.log("👉 Request aayi:", req.method, req.url);
  next();
});
app.use(cookieParser())
app.use("/",router);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});