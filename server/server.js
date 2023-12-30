import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"../client")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "welcome.html"))
})

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "chat.html"))
})

app.get("/answers", (req, res) => {
    const dataPath = path.resolve(__dirname, "..", "answers.json")
    try{
        const rawData = fs.readFileSync(dataPath, 'utf8')
        const jsonData = JSON.parse(rawData)
        res.send(jsonData)
    } catch (e) {
        console.error('Error reading answers.json', e.message)
    }
})



const PORT = 8080
app.listen(PORT, () => {
    console.log("Server available on: http://localhost:8080")
})