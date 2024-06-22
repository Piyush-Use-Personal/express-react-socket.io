import express from "express";
import cors from "cors";
import http from "http";
import { SocketServer } from "./socket.js";

export const app = express();
app.use(cors());
export const server = http.createServer(app);
export const socket = new SocketServer(server)