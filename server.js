// const express = require("express");
// const app = express();
// const notesRoutes = require("./routes/notes");

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Routes
// app.use("/notes", notesRoutes);

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });



const express = require("express");
const app = express();
const path = require("path");
const notesRoutes = require("./routes/notes");

// Middleware
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/notes", notesRoutes);

// Optional Root route for message
app.get("/", (req, res) => {
  res.send("Welcome to the Notes API! Visit /notes to see all notes.");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
