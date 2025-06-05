import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { createAccount } from "../../utils/accountApi";
type CreateAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateAccountModal({ visible, onClose, onCreated }: CreateAccountModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"credit" | "checking" | "savings" | "investment">("checking");
  const [balance, setBalance] = useState("");
  const [institution, setInstitution] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleCreate = async () => {
    try {
      await createAccount({ name, type, balance: Number(balance), institution, accountNumber });
      onCreated();
      console.log("Account created:", { name, type, balance, institution, accountNumber });
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
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Type (checking, savings, credit, investment)" value={type} onChangeText={t => setType(t as any)} style={styles.input} />
        <TextInput placeholder="Balance" value={balance} onChangeText={setBalance} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Institution" value={institution} onChangeText={setInstitution} style={styles.input} />
        <TextInput placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} style={styles.input} />
        <Button title="Create" onPress={handleCreate} />
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