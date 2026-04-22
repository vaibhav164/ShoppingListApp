import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ItemRow from "../item/ItemRow";
import { styles } from "./style";

export default function ListCard({
  item,
  addItem,
  toggleItem,
  deleteItem,
  markAllComplete,
  deleteCompleted,
}) {
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
        <ItemRow
          key={i.id}
          item={i}
          listId={item.id}
          toggleItem={toggleItem}
          deleteItem={deleteItem}
        />
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
}
