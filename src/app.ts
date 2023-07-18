import express, { Application, json, Request, Response } from "express";

const app: Application = express();
app.use(json());

app.post("/", (request: Request, response: Response): Response => {
  return response.status(201).json(request.body);
});

app.get("/", (request: Request, response: Response): Response => {
  return response.status(200).json({ status: "ok" });
});

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
