interface IPurchaseItens {
  name: string;
  quantity: string;
}

interface IPurchaseList {
  id: number;
  listName: string;
  data: IPurchaseItens[];
}

type TPurchaseListRequest = Omit<IPurchaseList, "id">;

//serializando dados
type TPurchaseRequiredFields = "listName" | "data";

type TPurchaseRequiredDataFields = "name" | "quantity";

type TPurchaseItensUpdate = Partial<IPurchaseItens>;

export {
  IPurchaseList,
  TPurchaseListRequest,
  TPurchaseRequiredFields,
  TPurchaseRequiredDataFields,
  IPurchaseItens,
  TPurchaseItensUpdate,
};
