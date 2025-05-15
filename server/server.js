import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jobRoutes from "./routes/jobs.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the Vite build output
app.use(express.static(path.resolve(__dirname, "dist")));

// Handle SPA fallback
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

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
