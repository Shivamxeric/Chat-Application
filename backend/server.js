import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";



import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());  // For JSON request body parsing
app.use(express.urlencoded({ extended: true })); // Handles form data
app.use(cookieParser());  // Handles cookies


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes)


app.use(express.static(path.join(__dirname, "/public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
