export type List = {
  id: number;
  name: string;
  priority: "High" | "Medium" | "Low";
  color?: string;
};

export type Item = {
  id: number;
  listId: number;
  name: string;
  quantity?: string;
  notes?: string;
  completed: boolean;
};
