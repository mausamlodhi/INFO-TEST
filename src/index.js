import express from "express";
import Bootstrap from "./boostrap";
const app = express();
app.set('port',5000);
const boostrap = new Bootstrap(app);