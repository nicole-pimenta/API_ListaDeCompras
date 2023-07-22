import express, { Application, json, Request, Response } from "express";
import logics from "./logics";
const app: Application = express();
app.use(json());

app.post("/purchaseList", logics.create);

app.get("/purchaseList", logics.read);

app.get("/purchaseList/:purchaseListId", logics.readById);

app.patch("/purchaseList/:purchaseListId/:itemName", logics.update);

app.delete("/purchaseList/:purchaseListId/:itemName", logics.destroy);

app.delete("/purchaseList/:purchaseListId", logics.destroyList);

const PORT: number = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
