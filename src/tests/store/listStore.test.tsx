import listReducer, { addList } from "../../store/listSlice";

describe("listSlice", () => {
  const initialState = {
    lists: [],
  };

  it("should handle addList", () => {
    const action = addList({
      name: "Groceries",
      priority: "High",
      color: "#6366F1",
    });

    const state = listReducer(initialState, action);

    expect(state.lists.length).toBe(1);
    expect(state.lists[0].name).toBe("Groceries");
    expect(state.lists[0].priority).toBe("High");
    expect(state.lists[0].items).toEqual([]);
  });

  it("should not add list with empty name", () => {
    const action = addList({
      name: "",
      priority: "Low",
      color: "#000",
    });

    const state = listReducer(initialState, action);

    expect(state.lists.length).toBe(0);
  });
});
