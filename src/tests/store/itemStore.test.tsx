import itemReducer, {
  addItem,
  deleteItem,
  toggleItem,
} from "../../store/itemStore";

describe("itemSlice", () => {
  const initialState = {
    items: [],
  };

  it("should add item", () => {
    const action = addItem({
      listId: "1",
      name: "Milk",
      quantity: "2L",
    });

    const state = itemReducer(initialState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].name).toBe("Milk");
  });

  it("should toggle item completion", () => {
    const stateWithItem = {
      items: [{ id: "a", completed: false }],
    };

    const action = toggleItem({ id: "a" });

    const state = itemReducer(stateWithItem, action);

    expect(state.items[0].completed).toBe(true);
  });

  it("should delete item", () => {
    const stateWithItem = {
      items: [{ id: "a", completed: false }],
    };

    const action = deleteItem({ id: "a" });

    const state = itemReducer(stateWithItem, action);

    expect(state.items.length).toBe(0);
  });
});
