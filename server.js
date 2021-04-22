// Dependencies
const express = require ("express");
const path = require("path");
const uuid = require("uuid");
const util = require("util");
const fs = require("fs");

// Tells node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const readFile = async () => {
    let data = await readFilePromise("./Develop/db/db.json", "utf-8")
    return JSON.parse(data)
};

const writeFile = async (data) => {
    data = JSON.stringify(data, null, 2)
    await writeFilePromise("./Develop/db/db.json", data)
};

// HTML Routes
// Displays home page
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
})
// Displays notes page
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./views/notes.html"));
})

// API Routes
app.get("/api/notes", async (req, res) => {
    let data = await readFile()
    res.json(data)
});

app.post("/api/notes", async (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    if (!newNote.title || !newNote.text) {
       return res.status(400).json({ msg: "Please include a title and text"});
    }

    let notes = await readFile()
    await writeFile([...notes, newNote]);
    res.send(newNote);
});

// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

