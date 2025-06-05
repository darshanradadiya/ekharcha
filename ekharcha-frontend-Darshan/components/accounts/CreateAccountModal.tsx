import { Picker } from "@react-native-picker/picker"; // dropdown picker
import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { createAccount } from "../../utils/accountApi";

type CreateAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateAccountModal({
  visible,
  onClose,
  onCreated,
}: CreateAccountModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<
    "credit" | "checking" | "savings" | "investment"
  >("checking");
  const [balance, setBalance] = useState("");
  const [institution, setInstitution] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleCreate = async () => {
    try {
      await createAccount({
        name: name.trim(),
        type,
        balance: Number(balance),
        institution,
        accountNumber,
      });
      onCreated();
      console.log("Account created:", {
        name,
        type,
        balance,
        institution,
        accountNumber,
      });
      setName("");
      setType("checking");
      setBalance("");
      setInstitution("");
      setAccountNumber("");
      onClose();
    } catch (error) {
      console.error("Error creating account: ", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) =>
                setType(itemValue as "credit" | "checking" | "savings" | "investment")
              }
              mode="dropdown"
              style={styles.picker}
            >
              <Picker.Item label="Checking" value="checking" />
              <Picker.Item label="Savings" value="savings" />
              <Picker.Item label="Credit" value="credit" />
              <Picker.Item label="Investment" value="investment" />
            </Picker>
          </View>

          <TextInput
            placeholder="Balance"
            value={balance}
            onChangeText={setBalance}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="Institution"
            value={institution}
            onChangeText={setInstitution}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
    color: "#222",
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  picker: {
    height: 48,
    width: "100%",
    color: "#222",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: "#4f46e5", // Indigo-600
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ef4444", // Red-500
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
