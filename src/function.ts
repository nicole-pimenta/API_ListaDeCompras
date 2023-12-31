import database from "./database";
import {
  IPurchaseItens,
  TPurchaseItensUpdate,
  TPurchaseListRequest,
  TPurchaseRequiredDataFields,
  TPurchaseRequiredFields,
} from "./interface";

const getNextId = (): number => {
  const lastItem = database.sort((a, b) => a.id - b.id).at(-1);

  if (!lastItem) return 1;
  return lastItem.id + 1;
};

function hasRequiredFields(payload: TPurchaseListRequest) {
  //1.verificando: ListName + Data
  const payloadKeys: string[] = Object.keys(payload);
  const requiredFields: TPurchaseRequiredFields[] = ["listName", "data"];

  const firstRequiredField = payloadKeys.every((key: any) =>
    requiredFields.includes(key)
  );

  //2.Verificando:Data , com name + quantity
  const requiredDataFields: TPurchaseRequiredDataFields[] = [
    "name",
    "quantity",
  ];

  const secondRequiredField = payload.data.map((item: any) => {
    const DataKeys = Object.keys(item);
    return DataKeys.every((item: any) => requiredDataFields.includes(item));
  });

  if (!firstRequiredField) {
    throw new Error("Required fields are:'listName' and 'Data'");
  }

  if (!secondRequiredField[0]) {
    throw new Error("Required fields are:'name' and 'quantity'");
  }
}

function hasListNameRequiredType(payload: TPurchaseListRequest) {
  if (typeof payload.listName !== "string") {
    throw new Error("The list name need to be a string");
  }
}

function hasRequiredDataTypes(
  payload: IPurchaseItens | TPurchaseItensUpdate
): boolean {
  const payloadValues: string[] = Object.values(payload);
  const requiredTypes: string[] = ["string"];

  return payloadValues.every((item) => requiredTypes.includes(typeof item));
}

function hasRequiredDataFields(payload: any) {
  const requiredDataFields: TPurchaseRequiredDataFields[] = [
    "name",
    "quantity",
  ];

  const DataKeys = Object.keys(payload);
  return DataKeys.every((item: any) => requiredDataFields.includes(item));
}

export {
  getNextId,
  hasRequiredFields,
  hasListNameRequiredType,
  hasRequiredDataTypes,
  hasRequiredDataFields,
};
