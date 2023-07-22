import database from "./database";
import {
  TPurchaseRequiredDataFields,
  TPurchaseRequiredFields,
} from "./interface";

//1. Função para buscar o próximo id
const getNextId = (): number => {
  const lastItem = database.sort((a, b) => a.id - b.id).at(-1);

  if (!lastItem) return 1;
  return lastItem.id + 1;
};

//2.Função para verificar se os campos requeridos são passados

function hasRequiredFields(payload: any) {
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

function hasRequiredFieldsTypes(payload: any) {
  const payloadValues: string[] = Object.values(payload);

  const requiredTypes: string[] = ["string", "object"];

  const verify = payloadValues.every((item) =>
    requiredTypes.includes(typeof item)
  );

  if (!verify) {
    throw new Error("The list name need to be a string");
  }
}

// function hasListExists(listId: any) {
//   const foundList = database.find(
//     (purchase) => purchase.id === parseInt(listId)
//   );

//   if (!foundList) {
//     const message = `List with id ${listId} does not exist`;
//     throw new Error(message);
//   }
// }

// function hasListItemExists(purchaseItemId: any) {
//   const foundItem = database.find((list) =>
//     list.data.find((purchase) => purchase.name === purchaseItemId)
//   );

//   if (!foundItem) {
//     const message = `Item ${purchaseItemId} does not exist`;
//     throw new Error(message);
//   }
// }
function hasRequiredValuesTypesUpdate(payload: any) {
  const payloadValues: string[] = Object.values(payload);

  const requiredTypes: string[] = ["string"];

  return payloadValues.every((item) => requiredTypes.includes(typeof item));
}

function hasRequiredDataFieldsUpdate(payload: any) {
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
  hasRequiredFieldsTypes,
  hasRequiredValuesTypesUpdate,
  hasRequiredDataFieldsUpdate,
};
