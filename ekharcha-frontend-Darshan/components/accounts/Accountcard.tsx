import {
  Briefcase,
  CreditCard,
  DollarSign,
  Pencil,
  PiggyBank,
  Trash2,
} from "lucide-react-native";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Account } from "../../types/types";
import { deleteAccount } from "../../utils/accountApi";

interface AccountCardProps {
  account: Account;
  onEdit?: (account: Account) => void;
  onDeleted?: () => void;
}

const AccountCard = ({ account, onEdit, onDeleted }: AccountCardProps) => {
  const { name, type, balance, institution, accountNumber, _id } = account;

  const getAccountIcon = () => {
    switch (type) {
      case "checking":
        return <DollarSign size={24} color="#3B82F6" />;
      case "savings":
        return <PiggyBank size={24} color="#8B5CF6" />;
      case "credit":
        return <CreditCard size={24} color="#F59E0B" />;
      case "investment":
        return <Briefcase size={24} color="#10B981" />;
      default:
        return <DollarSign size={24} color="#3B82F6" />;
    }
  };

  const getAccountTypeLabel = () => {
    switch (type) {
      case "checking":
        return "Checking Account";
      case "savings":
        return "Savings Account";
      case "credit":
        return "Credit Card";
      case "investment":
        return "Investment Account";
      default:
        return "Account";
    }
  };

  const formatAccountNumber = (number: string) => {
    return `••••${number.slice(-4)}`;
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount(String(_id));
              if (onDeleted) onDeleted();
            } catch {
              Alert.alert("Error", "Failed to delete account.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountHeader}>
        <View style={styles.iconContainer}>{getAccountIcon()}</View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{name}</Text>
          <Text style={styles.accountType}>{getAccountTypeLabel()}</Text>
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text
          style={[
            styles.balanceAmount,
            type === "credit" && balance < 0 ? styles.negativeBalance : null,
          ]}
        >
          ${Math.abs(balance).toFixed(2)}
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Institution</Text>
          <Text style={styles.detailValue}>{institution}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Account Number</Text>
          <Text style={styles.detailValue}>
            {formatAccountNumber(accountNumber)}
          </Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.editDeleteContainer}>
        <TouchableOpacity
          style={[styles.iconButton, styles.editButton]}
          onPress={() => onEdit && onEdit(account)}
        >
          <Pencil size={18} color="#3B82F6" />
          <Text style={styles.editDeleteText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Trash2 size={18} color="#EF4444" />
          <Text style={[styles.editDeleteText, { color: "#EF4444" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },
  accountType: {
    fontSize: 14,
    color: "#64748B",
  },
  balanceContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  negativeBalance: {
    color: "#EF4444",
  },
  detailsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748B",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
  },
  actionsContainer: {
    flexDirection: "row",
    padding: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
  },
  editDeleteContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: "#F1F5F9",
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#F1F5F9",
  },
  editDeleteText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
  },
});

export default AccountCard;
