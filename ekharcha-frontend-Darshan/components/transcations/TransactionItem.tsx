import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Transaction } from "../../types/types";
import { deleteTransaction } from "../../utils/transactionApi";

interface Props {
  transaction: Transaction;
  onDeleted?: () => void;
}

const TransactionItem: React.FC<Props> = ({ transaction, onDeleted }) => {
  const handleDelete = async () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(transaction._id || transaction.id);
            if (onDeleted) onDeleted();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.desc}>{transaction.description}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={[styles.amount, { color: transaction.type === "income" ? "#10B981" : "#EF4444" }]}>
          {transaction.type === "income" ? "+" : "-"}₹{transaction.amount}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  desc: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  date: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
  delete: {
    color: "#EF4444",
    marginTop: 6,
    fontWeight: "600",
  },
});

export default TransactionItem;