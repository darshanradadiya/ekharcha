import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { updateAccount } from "../../utils/accountApi";

type UpdateAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  account: {
    _id: string;
    name: string;
    type: string;
    balance: number;
    institution: string;
    accountNumber: string;
  };
  onUpdated: () => void;
};

export default function UpdateAccountModal({
  visible,
  onClose,
  account,
  onUpdated,
}: UpdateAccountModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"credit" | "checking" | "savings" | "investment">("checking");
  const [balance, setBalance] = useState("");
  const [institution, setInstitution] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    setName(account?.name || "");
    setType(account?.type as any || "checking");
    setBalance(account?.balance?.toString() || "");
    setInstitution(account?.institution || "");
    setAccountNumber(account?.accountNumber || "");
  }, [account]);

const handleUpdate = async () => {
  if (!account || !account._id || typeof account._id !== "string") {
    alert("❌ Invalid account ID");
    return;
  }

  const parsedBalance = Number(balance);
  if (isNaN(parsedBalance)) {
    alert("❌ Balance must be a valid number");
    return;
  }

  console.log("🔍 Updating ID:", account._id);

  try {
    await updateAccount(account._id, {
      name,
      type,
      balance: parsedBalance,
      institution,
      accountNumber,
    });
    onUpdated();
    onClose();
  } catch (err) {
    console.error("❌ Update failed:", err);
    alert("Update failed.");
  }
};


  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Update Account</Text>

        <TextInput
          placeholder="Account Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
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
        />
        <TextInput
          placeholder="Institution"
          value={institution}
          onChangeText={setInstitution}
          style={styles.input}
        />
        <TextInput
          placeholder="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          style={styles.input}
        />

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f6fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#2f3640",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  updateButton: {
    flex: 1,
    backgroundColor: "#44bd32",
    padding: 14,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#e84118",
    padding: 14,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});