import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ---------- TYPES ----------
const priorities = ["High", "Medium", "Low"];
const colors = ["#6366F1", "#EC4899", "#22C55E", "#F59E0B"];

export default function App() {
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  // Filter lists
  const filtered = lists.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()),
  );

  // ---------- ADD LIST ----------
  const addList = () => {
    if (!newListName.trim()) return;

    const newList = {
      id: Date.now().toString(),
      name: newListName,
      priority,
      color: selectedColor,
      items: [],
    };

    setLists((prev) => [newList, ...prev]);
    setNewListName("");
    setPriority("Medium");
    setSelectedColor(colors[0]);
    setModalVisible(false);
  };

  // ---------- ITEM ACTIONS ----------
  const addItem = (listId) => {
    const item = {
      id: Date.now().toString(),
      name: "New Item",
      quantity: "",
      notes: "",
      completed: false,
    };

    setLists((prev) =>
      prev.map((l) =>
        l.id === listId ? { ...l, items: [...l.items, item] } : l,
      ),
    );
  };

  const toggleItem = (listId, itemId) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: l.items.map((i) =>
                i.id === itemId ? { ...i, completed: !i.completed } : i,
              ),
            }
          : l,
      ),
    );
  };

  const deleteItem = (listId, itemId) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.filter((i) => i.id !== itemId) }
          : l,
      ),
    );
  };

  const markAllComplete = (listId) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? {
              ...l,
              items: l.items.map((i) => ({ ...i, completed: true })),
            }
          : l,
      ),
    );
  };

  const deleteCompleted = (listId) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.filter((i) => !i.completed) }
          : l,
      ),
    );
  };

  // ---------- UI ----------
  const renderItem = ({ item }) => {
    const total = item.items.length;
    const completed = item.items.filter((i) => i.completed).length;
    const progress = total === 0 ? 0 : completed / total;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={{
          backgroundColor: "#F8FAFC",
          padding: 16,
          borderRadius: 18,
          marginBottom: 14,
          borderWidth: 1,
          borderColor: "#E2E8F0",
        }}
      >
        {/* Top Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#1E293B" }}>
            {item.name}
          </Text>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
              backgroundColor:
                item.priority === "High"
                  ? "#FEE2E2"
                  : item.priority === "Medium"
                    ? "#FEF3C7"
                    : "#DCFCE7",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color:
                  item.priority === "High"
                    ? "#DC2626"
                    : item.priority === "Medium"
                      ? "#D97706"
                      : "#16A34A",
              }}
            >
              {item.priority}
            </Text>
          </View>
        </View>

        {/* Sub Info */}
        <Text style={{ color: "#64748B", marginTop: 6 }}>
          {completed}/{total} items completed
        </Text>

        {/* Progress Bar */}
        <View
          style={{
            height: 6,
            backgroundColor: "#E2E8F0",
            borderRadius: 10,
            marginTop: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              backgroundColor: item.color,
            }}
          />
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E2E8F0",
            marginVertical: 12,
          }}
        />

        {/* Items Preview (max 2 items) */}
        {item.items.slice(0, 2).map((i) => (
          <Text
            key={i.id}
            style={{
              color: "#334155",
              textDecorationLine: i.completed ? "line-through" : "none",
              marginBottom: 4,
            }}
          >
            • {i.name}
          </Text>
        ))}

        {item.items.length > 2 && (
          <Text style={{ color: "#94A3B8", marginTop: 4 }}>
            +{item.items.length - 2} more items
          </Text>
        )}

        {/* Actions */}
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <TouchableOpacity onPress={() => addItem(item.id)}>
            <Text
              style={{ marginRight: 16, color: "#6366F1", fontWeight: "600" }}
            >
              + Add Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => markAllComplete(item.id)}>
            <Text style={{ marginRight: 16, color: "#16A34A" }}>
              Complete All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteCompleted(item.id)}>
            <Text style={{ color: "#DC2626" }}>Clear Done</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#E2E8F0" }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 16 }}>
        My Lists
      </Text>

      <TextInput
        placeholder="Search lists..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#F8FAFC",
          padding: 10,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No lists yet</Text>}
      />

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: "absolute",
          bottom: 30,
          right: 20,
          backgroundColor: "#6366F1",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              backgroundColor: "#F8FAFC",
              padding: 20,
              borderRadius: 16,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Create List</Text>

            <TextInput
              placeholder="List name"
              value={newListName}
              onChangeText={setNewListName}
              style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {priorities.map((p) => (
                <TouchableOpacity key={p} onPress={() => setPriority(p)}>
                  <Text style={{ marginRight: 10 }}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {colors.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setSelectedColor(c)}
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: c,
                    marginRight: 10,
                  }}
                />
              ))}
            </View>

            <TouchableOpacity onPress={addList}>
              <Text>Add List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
