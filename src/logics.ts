import { Request, Response } from "express";
import database from "./database";
import { IPurchaseList } from "./interface";

const getNextId = (): number => {
  const lastItem = database.sort((a, b) => a.id - b.id).at(-1);

  if (!lastItem) return 1;
  return lastItem.id + 1;
};

const create = (request: Request, response: Response): Response => {
  const body = request.body;

  const newPurchaseList: IPurchaseList = {
    id: getNextId(),
    ...body,
  };

  database.push(newPurchaseList);
  return response.status(201).json(newPurchaseList);
};

const read = (request: Request, response: Response): Response => {
  return response.status(200).json(database);
};

const readById = (request: Request, response: Response): Response => {
  const { purchaseListId } = request.params;

  const foundPurchase = database.find(
    (purchase) => purchase.id === parseInt(purchaseListId)
  );

  if (!foundPurchase) {
    const error = " Purchase id not found";
    return response.status(404).json(error);
  }

  return response.status(200).json(foundPurchase);
};

const update = (request: Request, response: Response): Response => {
  const { purchaseListId, itemName } = request.params;
  const body = request.body;

  const foundPurchase = database.find(
    (purchase) =>
      purchase.id === parseInt(purchaseListId) &&
      purchase.data.find((purchase) => purchase.name === itemName)
  );

  if (!foundPurchase) {
    const error = " Purchase id not found";
    return response.status(404).json(error);
  }

  const itemIndex = database.findIndex((purchase) =>
    purchase.data.map((item) => item.name === itemName)
  );

  database.map((item) => item.data.splice(itemIndex, 1, body));

  return response.status(200).json(database);
};

export default { create, read, readById, update };
