import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jobRoutes from "./routes/jobs.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "https://mini-jobboard.netlify.app/",
    })
);
app.use(express.json());

app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(
        process.env.MONGO_URI || "mongodb://localhost:27017/mini_job_board"
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
