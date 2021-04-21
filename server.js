// Dependencies
const express = require ("express");
const path = require("path");

// Tells node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// Displays home page
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
})
// Displays notes page
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./views/notes.html"));
})

// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

