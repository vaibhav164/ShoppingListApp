import { create } from "zustand";
import { db } from "../database";
type List = {
  id: number;
  name: string;
};

type Item = {
  id: number;
  name: string;
  listId: number;
  completed: boolean;
};

type Store = {
  lists: List[];
  items: Item[];
  fetchLists: () => void;
};

export const useStore = create<Store>((set) => ({
  lists: [],
  items: [],

  fetchLists: () => {
    db.transaction((tx: any) => {
      tx.executeSql("SELECT * FROM lists", [], (value: any, result: any) => {
        set({ lists: result.rows._array });
      });
    });
  },
}));
