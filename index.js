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

// ============================================================
// 1. MONGODB CONNECTION (with full logging for Render/Atlas)
// ============================================================
console.log("==== ENV: DATABASE_CONNECTION_STRING ====");
console.log(process.env.DATABASE_CONNECTION_STRING);

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING ||
  "mongodb://127.0.0.1:27017/kambaz";

console.log("==== ACTUAL MONGO URI USED ====");
console.log(CONNECTION_STRING);

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("==== MongoDB CONNECTED SUCCESSFULLY ===="))
  .catch((err) => console.log("==== MONGODB CONNECTION ERROR ====", err));

// ============================================================
// 2. Express App Setup
// ============================================================
const app = express();

// CORS (must be BEFORE session)
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL, // example: https://your-vercel-url.vercel.app
  })
);

// Session (must be after CORS, before routes)
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
    domain: process.env.COOKIE_DOMAIN, // example: vercel.app
  };
}

app.use(session(sessionOptions));

// Body Parser
app.use(express.json());

// ============================================================
// 3. Routes
// ============================================================
Lab5(app);
Hello(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);

// ============================================================
// 4. Start Server
// ============================================================
app.listen(process.env.PORT || 4000, () => {
  console.log("==== SERVER STARTED ON PORT ====", process.env.PORT || 4000);
});
