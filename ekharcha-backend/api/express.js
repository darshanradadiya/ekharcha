import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel Express" });
});

export const handler = serverless(app);
