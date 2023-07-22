import { Request, Response } from "express";
import database from "./database";
import {
  IPurchaseList,
  TPurchaseRequiredFields,
  TPurchaseRequiredDataFields,
} from "./interface";

const getNextId = (): number => {
  const lastItem = database.sort((a, b) => a.id - b.id).at(-1);

  if (!lastItem) return 1;
  return lastItem.id + 1;
};

function hasRequiredDataFields(payload: any) {
  const requiredDataFields: TPurchaseRequiredDataFields[] = [
    "name",
    "quantity",
  ];

  let output = true;

  payload.data.map((item: any) => {
    const DataKeys = Object.keys(item);
    output = DataKeys.every((item: any) => requiredDataFields.includes(item));
  });

  return output;
}

function hasRequiredFields(payload: any) {
  const payloadKeys: string[] = Object.keys(payload);
  const requiredFields: TPurchaseRequiredFields[] = ["listName", "data"];

  return payloadKeys.every((key: any) => requiredFields.includes(key));
}

function hasRequiredFieldsTypes(payload: any) {
  const payloadValues: string[] = Object.values(payload);

  const requiredTypes: string[] = ["string", "object"];

  return payloadValues.every((item) => requiredTypes.includes(typeof item));
}

const validateData = (payload: any): IPurchaseList => {
  if (!hasRequiredFields(payload)) {
    throw new Error("Required fields are:'listName' and 'Data'");
  }
  if (!hasRequiredDataFields(payload)) {
    throw new Error("Required fields are:'name' and 'quantity'");
  }
  if (!hasRequiredFieldsTypes(payload)) {
    throw new Error("The list name need to be a string");
  }
  return payload;
};

const create = (request: Request, response: Response): Response => {
  try {
    validateData(request.body);

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
    const message = `List with id ${purchaseListId} does not exist`;
    return response.status(404).json({ message });
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
