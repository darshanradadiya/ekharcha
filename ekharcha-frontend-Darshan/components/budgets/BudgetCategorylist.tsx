import {
  TriangleAlert as AlertTriangle,
  CircleCheck as CheckCircle,
  Pencil,
  TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Budget } from "../../types/types";
import AddSpentModal from "./AddSpentModal";

interface BudgetCategoryListProps {
  budgets: Budget[];
  onSpentAdded: () => void;
  onEdit: (budget: Budget) => void;
  onEditSpent?: (budget: Budget) => void;
}

const BudgetCategoryList = ({
  budgets,
  onSpentAdded,
  onEdit,
  onEditSpent,
}: BudgetCategoryListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const openModal = (category: string) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const renderBudgetItem = ({ item }: { item: Budget }) => {
    const percentage = Math.round((item.spent / item.budgeted) * 100);
    const isOverBudget = item.spent > item.budgeted;

    const getBadgeIcon = () => {
      if (isOverBudget) return <AlertTriangle size={14} color="#FFFFFF" />;
      if (percentage > 90) return <AlertTriangle size={14} color="#FFFFFF" />;
      if (percentage < 50) return <TrendingUp size={14} color="#FFFFFF" />;
      return <CheckCircle size={14} color="#FFFFFF" />;
    };

    const getBadgeStyle = () => {
      if (isOverBudget) return styles.badgeOverBudget;
      if (percentage > 90) return styles.badgeWarning;
      if (percentage < 50) return styles.badgeUnderBudget;
      return styles.badgeOnTrack;
    };

    const getBadgeText = () => {
      if (isOverBudget) return "Over budget";
      if (percentage > 90) return "Near limit";
      if (percentage < 50) return "Under budget";
      return "On track";
    };

    return (
      <View style={styles.budgetItem}>
        <View style={styles.budgetHeader}>
          <Text style={styles.categoryName}>{item.category}</Text>
          <View style={[styles.badge, getBadgeStyle()]}>
            {getBadgeIcon()}
            <Text style={styles.badgeText}>{getBadgeText()}</Text>
          </View>
        </View>

        <View style={styles.budgetDetails}>
          <View style={styles.amountsContainer}>
            <Text style={styles.spentAmount}>${item.spent.toFixed(2)}</Text>
            <Text style={styles.budgetedAmount}>
              {" "}
              / ${item.budgeted.toFixed(2)}
            </Text>
          </View>
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              isOverBudget
                ? styles.progressBarOver
                : { width: `${Math.min(percentage, 100)}%` },
              { backgroundColor: isOverBudget ? "#EF4444" : "#3B82F6" },
            ]}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => openModal(item.category)}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>➕ Add Spent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onEdit(item)}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>✏️ Edit</Text>
          </TouchableOpacity>

          {onEditSpent && (
            <TouchableOpacity
              onPress={() => onEditSpent(item)}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>💰 Edit Spent</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        renderItem={renderBudgetItem}
        keyExtractor={(item, idx) =>
          item._id ? String(item._id) : `${item.category}-${idx}`
        }
        scrollEnabled={false}
      />
      <AddSpentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        category={selectedCategory || ""}
        onAdded={onSpentAdded}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  budgetItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeOverBudget: {
    backgroundColor: "#EF4444",
  },
  badgeWarning: {
    backgroundColor: "#F59E0B",
  },
  badgeUnderBudget: {
    backgroundColor: "#10B981",
  },
  badgeOnTrack: {
    backgroundColor: "#3B82F6",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  budgetDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  amountsContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  spentAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  budgetedAmount: {
    fontSize: 14,
    color: "#64748B",
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressBarOver: {
    width: "100%",
    backgroundColor: "#EF4444",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 10,
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#E0F2FE",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: "#0C4A6E",
    fontWeight: "600",
    fontSize: 13,
  },
});

export default BudgetCategoryList;
