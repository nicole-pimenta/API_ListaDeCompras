import { Request, Response } from "express";
import database from "./database";
import {
  IPurchaseItens,
  IPurchaseList,
  TPurchaseItensUpdate,
  TPurchaseListRequest,
} from "./interface";

import {
  getNextId,
  hasRequiredFields,
  hasListNameRequiredType,
  hasRequiredDataFields,
  hasRequiredDataTypes,
} from "./function";

const create = (request: Request, response: Response): Response => {
  try {
    const payload: TPurchaseListRequest = request.body;
    hasRequiredFields(payload);
    hasListNameRequiredType(payload);

    const newPurchaseList: IPurchaseList = {
      id: getNextId(),
      ...payload,
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
  try {
    const { foundList } = response.locals;

    return response.status(200).json(foundList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(404).json({ message: error.message });
    }
    return response.status(500).json({ message: error });
  }
};

const update = (request: Request, response: Response): Response => {
  try {
    const { itemName } = request.params;
    const payload: IPurchaseItens = request.body;
    const itemIndex = database.findIndex((purchase) =>
      purchase.data.map((item) => item.name === itemName)
    );

    if (!hasRequiredDataTypes(payload)) {
      const message = 'The list name need to be a string"';
      return response.status(400).json({ message });
    }

    if (!hasRequiredDataFields(payload)) {
      const message = 'Updatable fields are: "name" and "quantity"';
      return response.status(400).json({ message });
    }

    database.map((item) => item.data.splice(itemIndex, 1, payload));

    return response.status(200).json(payload);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(404).json({ message: error.message });
    }
    return response.status(500).json({ message: error });
  }
};

const destroy = (request: Request, response: Response): Response => {
  try {
    const { purchaseListId, itemName } = request.params;

    const itemIndex = database.findIndex((purchase) =>
      purchase.data.map((item) => item.name === itemName)
    );

    database.map((item) => item.data.splice(itemIndex + 1, 1));

    return response.status(204).json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(404).json({ message: error.message });
    }
    return response.status(500).json({ message: error });
  }
};

const destroyList = (request: Request, response: Response): Response => {
  try {
    const { purchaseListId } = request.params;
    const listIndex = database.findIndex(
      (purchase) => purchase.id === parseInt(purchaseListId)
    );

    database.splice(listIndex, 1);

    return response.status(204).json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(404).json({ message: error.message });
    }
    return response.status(500).json({ message: error });
  }
};
export default { create, read, readById, update, destroy, destroyList };
