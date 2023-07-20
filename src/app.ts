import express, { Application, json, Request, Response } from "express";
import logics from "./logics";
const app: Application = express();
app.use(json());

app.post("/purchaseList", logics.create);

app.get("/purchaseList", logics.read);

app.get("/purchaseList/:purchaseListId", logics.readById);

app.patch(
  "/purchaseList/:purchaseListId/:itemName",
  (request: Request, response: Response): Response => {
    return response.status(200).json({ status: "ok" });
  }
);

app.delete(
  "/purchaseList/:purchaseListId/:itemName",
  (request: Request, response: Response): Response => {
    return response.status(200).json({ status: "ok" });
  }
);

app.delete(
  "/purchaseList/:purchaseListId",
  (request: Request, response: Response): Response => {
    return response.status(200).json({ status: "ok" });
  }
);

const PORT: number = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
