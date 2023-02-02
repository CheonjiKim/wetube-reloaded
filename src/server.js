import express from "express";

const PORT = 4000;
const app = express();

const handleListening = () =>
  console.log(`Server listening on http://localhost:${PORT}`);

app.get("/", () => console.log("Somebody is trying to go home."));

app.listen(PORT, handleListening);
