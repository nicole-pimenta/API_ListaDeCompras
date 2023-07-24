import express, { Application, json } from "express";
import logics from "./logics";
import middlewares from "./middlewares";
const app: Application = express();
app.use(json());

app.post("/purchaseList", logics.create);

app.get("/purchaseList", logics.read);

app.use("/purchaseList/:purchaseListId", middlewares.hasListExists);

app.get("/purchaseList/:purchaseListId", logics.readById);

app.patch(
  "/purchaseList/:purchaseListId/:itemName",

  middlewares.hasItemExists,
  logics.update
);

app.delete(
  "/purchaseList/:purchaseListId/:itemName",
  middlewares.hasItemExists,
  logics.destroy
);

app.delete("/purchaseList/:purchaseListId", logics.destroyList);

const PORT: number = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
