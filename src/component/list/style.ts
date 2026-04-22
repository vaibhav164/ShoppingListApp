import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  modalClose: { position: "absolute", top: 20, right:  },
});
