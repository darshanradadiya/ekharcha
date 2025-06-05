import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
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

export default function UpdateAccountModal({ visible, onClose, account, onUpdated }: UpdateAccountModalProps) {
  const [name, setName] = useState(account?.name || "");
  const [type, setType] = useState(account?.type || "checking");
  const [balance, setBalance] = useState(account?.balance?.toString() || "");
  const [institution, setInstitution] = useState(account?.institution || "");
  const [accountNumber, setAccountNumber] = useState(account?.accountNumber || "");

  const handleUpdate = async () => {
    await updateAccount(account._id, { name, type, balance: Number(balance), institution, accountNumber });
    onUpdated();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.title}>Update Account</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Type" value={type} onChangeText={setType} style={styles.input} />
        <TextInput placeholder="Balance" value={balance} onChangeText={setBalance} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Institution" value={institution} onChangeText={setInstitution} style={styles.input} />
        <TextInput placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} style={styles.input} />
        <Button title="Update" onPress={handleUpdate} />
        <Button title="Cancel" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 12, padding: 8, borderRadius: 4 },
});