import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./db";
import { userRoutes } from "./routes/users";
import { conversionRoutes } from "./routes/convertions";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sirve archivos estáticos
app.use(express.static(path.join(process.cwd(), "src")));
app.use(express.static(path.join(process.cwd(), "src/pages"))); 
app.use(express.static(path.join(process.cwd(), "dist/src")));
app.use(express.static(path.join(process.cwd(), "dist")));     

app.use("/api/users", userRoutes);
app.use("/api/conversions", conversionRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/pages/index.html"));
});

async function startServer(): Promise<void> {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
export default app;