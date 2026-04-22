import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../list/style";

export default function ItemRow({ item, listId, toggleItem, deleteItem }) {
  return (
    <View style={styles.itemRow}>
      <TouchableOpacity onPress={() => toggleItem(listId, item.id)}>
        <Text style={[styles.itemText, item.completed && styles.completedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Delete Item",
            `Are you sure you want to delete "${item.name}"?`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteItem(listId, item.id),
              },
            ],
          )
        }
      >
        <Ionicons name="trash" size={18} color="red" />
      </TouchableOpacity>
    </View>
  );
}
