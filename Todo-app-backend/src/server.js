import express from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5003;

// Get the file path from the URL of the current Module
const __filename = fileURLToPath(import.meta.url);

// Get the Dirname from the file path
const __dirname = dirname(__filename);


// middle Ware
// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json())

// Serve the HTML file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Routes
// takes url as /auth/register like that
app.use('/auth', authRoutes)
app.use('/todos' ,authMiddleware, todoRoutes)


// Start the server
// takes /auth/register like that

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});