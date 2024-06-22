import express from "express";
import morgan from "morgan";
import { app, server, socket } from "./config/server.js";
import { activeOnlineUser } from "./config/socket.js";

const port = process.env.PORT || 5000;

const notifications = []

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Express server");
});

app.get('/active-user', (req, res) => {
  res.json(activeOnlineUser)
})

app.get('/notification', (req, res) => {
  res.json([...notifications])
})

app.post('/notification', (req, res) => {
  const newNotification = {
    id: req.body.id,
    message: 'some random message'
  }
  notifications.push(newNotification)
  socket.sendNotification(newNotification)
  res.json(newNotification)
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


