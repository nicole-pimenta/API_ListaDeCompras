import { Request, Response } from "express";
import database from "./database";
import { IPurchaseList, TPurchaseRequiredKeys } from "./interface";

const getNextId = (): number => {
  const lastItem = database.sort((a, b) => a.id - b.id).at(-1);

  if (!lastItem) return 1;
  return lastItem.id + 1;
};

const validateData = (payload: any): IPurchaseList => {
  const payloadKeys: string[] = Object.keys(payload);
  const payloadValues = Object.values(payload);
  const requiredKeys: TPurchaseRequiredKeys[] = ["listName", "data"];
  const requiredTypes: string[] = ["string", "object"];

  const hasRequiredKeys: boolean = requiredKeys.every((key: string) =>
    payloadKeys.includes(key)
  );

  const hasExclusiveRequiredKeys = payloadKeys.every((item: any) =>
    requiredKeys.includes(item)
  );

  const hasRequiredType = payloadValues.every((item) =>
    requiredTypes.includes(typeof item)
  );

  if (!hasRequiredKeys || !hasExclusiveRequiredKeys) {
    const joinedKeys: string = requiredKeys.join(", ");
    throw new Error(`Required keys are: ${joinedKeys}`);
  }
  if (!hasRequiredType) {
    const joinedTypes: string = requiredTypes.join(", ");
    throw new Error(`Required types are: ${joinedTypes}`);
  }

  return payload;
};

const create = (request: Request, response: Response): Response => {
  // const payload = request.body;

  try {
    const validatedData: IPurchaseList = validateData(request.body);

    const newPurchaseList: IPurchaseList = {
      id: getNextId(),
      ...request.body,
    };

    database.push(newPurchaseList);
    return response.status(201).json(newPurchaseList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }
    console.log(error);
    return response.status(500).json({ message: error });
  }
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

const destroy = (request: Request, response: Response): Response => {
  const { purchaseListId, itemName } = request.params;

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

  database.map((item) => item.data.splice(itemIndex + 1, 1));

  return response.status(201).json(database);
};
export default { create, read, readById, update, destroy };
function type(item: string) {
  throw new Error("Function not implemented.");
}
