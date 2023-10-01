const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 3000;

app.use("/api", authRoutes);

// Middleware per la gestione degli errori
app.use((err, req, res, next) => {
  if (err.type === "authentication.failed") {
    return res.status(401).json({ error: "Authentication failed" });
  }
  if (err.type === "entity.not.found") {
    return res.status(404).json({ error: "Resource not found" });
  }
  if (err.type === "method.not.allowed") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (err.type === "existing.user") {
    return res.status(400).json({ error: "User already exists." });
  }
  if (err.type === "validation.error") {
    return res
      .status(400)
      .json({ error: "Validation error", details: err.details });
  }
  if (err.type === "database.error") {
    return res
      .status(500)
      .json({ error: "Database error", sqlMessage: err.sqlMessage });
  }
  // Gestione di tutti gli altri errori non specifici
  return res
    .status(500)
    .json({ error: "Internal Server Error", sqlMessage: err.sqlMessage });
});

module.exports = app;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
