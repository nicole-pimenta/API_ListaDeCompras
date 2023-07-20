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

export { IPurchaseList, TPurchaseListRequest };
