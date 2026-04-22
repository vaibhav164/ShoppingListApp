import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../list/style";

export default function AddListModal({
  visible,
  onClose,
  newListName,
  setNewListName,
  priority,
  setPriority,
  selectedColor,
  setSelectedColor,
  addList,
  priorities,
  colors,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Create List</Text>

          <Ionicons
            size={20}
            name="close"
            onPress={onClose}
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
                key={p}
                style={styles.optionButton}
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
  );
}
