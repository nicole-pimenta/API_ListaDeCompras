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
type TPurchaseRequiredKeys = "listName" | "data";

export { IPurchaseList, TPurchaseListRequest, TPurchaseRequiredKeys };
