import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { createBudget } from "../../utils/budgetApi";

type AddBudgetModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const categoryOptions = [
  "Food & Groceries",
  "Utilities",
  "Transport",
  "Entertainment",
  "Health",
];

export default function AddBudgetModal({
  visible,
  onClose,
  onCreated,
}: AddBudgetModalProps) {
  const [category, setCategory] = useState("");
  const [budgeted, setBudgeted] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setError("");
    if (!category || !budgeted.trim() || isNaN(Number(budgeted))) {
      setError("All fields are required and budget must be a number.");
      return;
    }

    try {
      await createBudget({
        category,
        budgeted: Number(budgeted),
      });
      setCategory("");
      setBudgeted("");
      onCreated(); // Refresh list
      onClose();
    } catch (e) {
      console.error("Failed to create budget:", e);
      setError("Failed to create budget");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Budget</Text>

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
              dropdownIconColor="#0F172A"
            >
              <Picker.Item label="Select Category" value="" />
              {categoryOptions.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Budgeted Amount</Text>
          <TextInput
            placeholder="Enter amount"
            value={budgeted}
            onChangeText={setBudgeted}
            keyboardType="numeric"
            style={styles.input}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
            <Text style={styles.addButtonText}>Add Budget</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 10,
    marginTop: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    height: 53,
    color: "#0F172A",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F8FAFC",
    marginBottom: 12,
    color: "#0F172A",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#1E293B",
    fontWeight: "500",
  },
});
