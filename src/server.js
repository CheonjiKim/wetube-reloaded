import express from "express";

const PORT = 4000;
const app = express();

const handleHome = (req, res) => {
  return res.send("Hello world");
};

app.get("/", handleHome);

const handleListening = () =>
  console.log(`Server listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
