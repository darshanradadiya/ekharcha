import React, { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Budget } from "../../types/types";
import { editSpentInBudgetApi } from "../../utils/budgetApi"; // You need to add this API function

type EditSpentModalProps = {
  visible: boolean;
  budget: Budget;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditSpentModal({
  visible,
  budget,
  onClose,
  onUpdated,
}: EditSpentModalProps) {
  const [spent, setSpent] = useState(budget.spent.toString());
  const [error, setError] = useState("");

  useEffect(() => {
    setSpent(budget.spent.toString());
    setError("");
  }, [budget, visible]);

  const handleUpdate = async () => {
    setError("");
    if (!spent.trim() || isNaN(Number(spent))) {
      setError("Spent amount is required and must be a number.");
      return;
    }

    try {
      await editSpentInBudgetApi(budget._id, Number(spent));
      onUpdated();
      onClose();
    } catch (e) {
      setError("Failed to update spent amount");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Spent Amount</Text>
          <Text style={styles.label}>Spent</Text>
          <TextInput
            placeholder="Enter spent amount"
            value={spent}
            onChangeText={setSpent}
            keyboardType="numeric"
            style={styles.input}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.addButton} onPress={handleUpdate}>
            <Text style={styles.addButtonText}>Update Spent</Text>
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