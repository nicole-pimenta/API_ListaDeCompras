import { NextFunction, Request, Response } from "express";
import database from "./database";

const hasListExists = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { purchaseListId } = request.params;
  const foundList = database.find(
    (list) => list.id === parseInt(purchaseListId)
  );

  if (!foundList) {
    const message = `List with id ${purchaseListId} does not exist`;
    return response.status(404).json({ message });
  }

  response.locals = {
    ...response.locals,
    foundList,
  };

  return next();
};

const hasItemExists = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { itemName } = request.params;
  const foundItem = database.find((list) =>
    list.data.find((dataItem) => dataItem.name === itemName)
  );

  if (!foundItem) {
    const message = `Item ${itemName} does not exist`;
    return response.status(404).json({ message });
  }

  response.locals = {
    ...response.locals,
    foundItem,
  };
  return next();
};

export default { hasListExists, hasItemExists };
