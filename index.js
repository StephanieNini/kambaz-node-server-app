import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";

import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});


const app = express();

// 1. CORS（必须放在最前面）
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// 2. Session（必须在 CORS 之后，Routes 之前）
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

// 3. 解析 JSON body（必须在 Session 之后）
app.use(express.json());

// 4. 你的 Routes
Lab5(app);
Hello(app);
UserRoutes(app, db);
CourseRoutes(app, db);  
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);

// 5. 启动服务器
app.listen(process.env.PORT || 4000);
