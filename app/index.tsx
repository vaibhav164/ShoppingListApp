import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const priorities = ["High", "Medium", "Low"];
const colors = ["#6366F1", "#EC4899", "#22C55E", "#F59E0B"];

export default function App() {
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const filtered = lists.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()),
  );

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

  const renderItem = ({ item }) => {
    const total = item.items.length;
    const completed = item.items.filter((i) => i.completed).length;
    const progress = total === 0 ? 0 : completed / total;

    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>

          <View
            style={[
              styles.priorityBadge,
              item.priority === "High"
                ? styles.highBg
                : item.priority === "Medium"
                  ? styles.mediumBg
                  : styles.lowBg,
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                item.priority === "High"
                  ? styles.highText
                  : item.priority === "Medium"
                    ? styles.mediumText
                    : styles.lowText,
              ]}
            >
              {item.priority}
            </Text>
          </View>
        </View>

        <Text style={styles.subText}>
          {completed}/{total} items completed
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%`, backgroundColor: item.color },
            ]}
          />
        </View>

        {item.items.map((i) => (
          <View key={i.id} style={styles.itemRow}>
            <TouchableOpacity onPress={() => toggleItem(item.id, i.id)}>
              <Text
                style={[styles.itemText, i.completed && styles.completedText]}
              >
                {i.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Delete Item",
                  `Are you sure you want to delete "${i.name}"?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => deleteItem(item.id, i.id),
                    },
                  ],
                )
              }
            >
              <Ionicons name="trash" size={18} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => addItem(item.id)}>
            <Text style={styles.add}>+ Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => markAllComplete(item.id)}>
            <Text style={styles.complete}>Complete All</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteCompleted(item.id)}>
            <Text style={styles.clear}>Clear Done</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Lists</Text>

      <TextInput
        placeholder="Search lists..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No lists yet</Text>
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.fab}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Create List</Text>
            <Ionicons
              size={20}
              name={"close"}
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}
            />
            <TextInput
              placeholder="List name"
              value={newListName}
              onChangeText={setNewListName}
              style={styles.modalInput}
            />

            <View style={styles.row}>
              {priorities.map((p) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  key={p}
                  onPress={() => setPriority(p)}
                >
                  <Text
                    style={[
                      styles.option,
                      { fontWeight: p === priority ? "700" : "400" },
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.row}>
              {colors.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setSelectedColor(c)}
                  style={[
                    styles.colorBox,
                    {
                      backgroundColor: c,
                      borderWidth: 2,
                      borderColor: c === selectedColor ? "#000" : "transparent",
                      borderRadius: 50,
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity onPress={addList}>
              <Text style={styles.addBtn}>Add List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#E2E8F0" },
  heading: { fontSize: 28, fontWeight: "700", marginBottom: 16 },

  input: {
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 18, fontWeight: "700", color: "#1E293B" },

  subText: { color: "#64748B", marginTop: 6 },

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  highBg: { backgroundColor: "#FEE2E2" },
  mediumBg: { backgroundColor: "#FEF3C7" },
  lowBg: { backgroundColor: "#DCFCE7" },

  priorityText: { fontSize: 12, fontWeight: "600" },
  highText: { color: "#DC2626" },
  mediumText: { color: "#D97706" },
  lowText: { color: "#16A34A" },

  progressBar: {
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: { height: "100%" },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  itemText: { color: "#334155" },
  completedText: { textDecorationLine: "line-through" },

  actions: { flexDirection: "row", marginTop: 12 },
  add: { marginRight: 16, color: "#6366F1", fontWeight: "600" },
  complete: { marginRight: 16, color: "#16A34A" },
  clear: { color: "#DC2626" },

  emptyContainer: { alignItems: "center", marginTop: 50 },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#6366F1",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  modal: {
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 16,
  },

  modalTitle: { fontSize: 18, marginBottom: 10 },

  modalInput: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },

  row: { flexDirection: "row", marginBottom: 10 },
  colorBox: { width: 25, height: 25, marginRight: 10 },

  addBtn: { marginTop: 10 },
  optionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#E2E8F0",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  modalClose: { position: "absolute", top: 20, right: 20 },
});
