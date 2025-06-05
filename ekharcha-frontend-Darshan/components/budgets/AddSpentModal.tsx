import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addSpentToBudget } from "../../utils/budgetApi";

type AddSpentModalProps = {
  visible: boolean;
  onClose: () => void;
  category: string;
  onAdded: () => void;
};

export default function AddSpentModal({
  visible,
  onClose,
  category,
  onAdded,
}: AddSpentModalProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async () => {
    setError("");
    if (!amount.trim() || isNaN(Number(amount))) {
      setError("Enter a valid amount");
      return;
    }

    try {
      await addSpentToBudget(category, Number(amount));
      setAmount("");
      onAdded();
      onClose();
    } catch (e) {
      setError("Failed to add spent");
      console.error("Error adding spent:", e);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add Spent to “{category}”</Text>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add Spent</Text>
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
    backgroundColor: "#fff",
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F8FAFC",
    color: "#0F172A",
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#10B981",
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
