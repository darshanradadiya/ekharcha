import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Budget } from "../../types/types";
import { updateBudget } from "../../utils/budgetApi";

type EditBudgetModalProps = {
  visible: boolean;
  budget: Budget;
  onClose: () => void;
  onUpdated: () => void;
};

const categoryOptions = [
  "Food & Groceries",
  "Utilities",
  "Transport",
  "Entertainment",
  "Health",
];

export default function EditBudgetModal({
  visible,
  budget,
  onClose,
  onUpdated,
}: EditBudgetModalProps) {
  const [category, setCategory] = useState(budget.category);
  const [budgeted, setBudgeted] = useState(budget.budgeted.toString());
  const [error, setError] = useState("");

  useEffect(() => {
    setCategory(budget.category);
    setBudgeted(budget.budgeted.toString());
    setError("");
  }, [budget, visible]);

  const handleUpdate = async () => {
    setError("");
    if (!category || !budgeted.trim() || isNaN(Number(budgeted))) {
      setError("All fields are required and budget must be a number.");
      return;
    }

    try {
      await updateBudget(budget._id, {
        category,
        budgeted: Number(budgeted),
      });
      onUpdated(); // Refresh list
      onClose();
    } catch (e) {
      console.error("Failed to update budget:", e);
      setError("Failed to update budget");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Budget</Text>

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

          <TouchableOpacity style={styles.addButton} onPress={handleUpdate}>
            <Text style={styles.addButtonText}>Update Budget</Text>
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