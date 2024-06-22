import express from "express";
import morgan from "morgan";
import { app, server } from "./config/server.js";

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Express server");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


