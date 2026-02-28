// import express, { urlencoded } from "express"
// import router from "./routes/admin.routes.js";
// import cors from "cors"
// import { config } from "dotenv";
// config();

// const app = express();
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// app.use(router)
// app.use(cors({
//   origin: "*",
//   methods: ["GET","POST","PUT","DELETE","PATCH"],
//   credentials: false
// }))





// app.listen(3000);

import express, { urlencoded } from "express"
import router from "./routes/admin.routes.js";
import cors from "cors"
import { config } from "dotenv";
config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  credentials: true
}))
app.use(router)





app.listen(3000);