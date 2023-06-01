export interface ShoppingItem {
  id: string;
  name: string;
  price: number;
}

export interface ShoppingList {
  id: string;
  date: string;
  items: ShoppingItem[];
}
