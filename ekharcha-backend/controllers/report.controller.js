import Transaction from "../models/transcation.model.js";

// GET /api/reports/monthly?period=3M
export const getMonthlyReport = async (req, res) => {
  const { period = "3M" } = req.query;
  const userId = req.user.id;
  const months = { "1M": 1, "3M": 3, "6M": 6, "1Y": 12, "ALL": 120 };
  const monthsBack = months[period] || 3;

  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - monthsBack);

  // Log outside the pipeline!
  console.log("Fetching monthly report for user:", userId, "from date:", fromDate);

  try {
    const pipeline = [
      { $match: { userId, date: { $gte: fromDate } } },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ];

    const data = await Transaction.aggregate(pipeline);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch monthly report", error: err.message });
  }
};
// GET /api/reports/category-breakdown?period=3M
export const getCategoryBreakdown = async (req, res) => {
  const { period = "3M" } = req.query;
  const userId = req.user.id;
  const months = { "1M": 1, "3M": 3, "6M": 6, "1Y": 12, "ALL": 120 };
  const monthsBack = months[period] || 3;

  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - monthsBack);

  try {
    const pipeline = [
      { $match: { userId, date: { $gte: fromDate }, type: "expense" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ];

    const data = await Transaction.aggregate(pipeline);
    const totalSpent = data.reduce((sum, c) => sum + c.total, 0);

    // Optionally, assign a color for each category
    const getCategoryColor = (category) => {
      const colors = [
        "#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#FCD34D"
      ];
      return colors[Math.abs(hashCode(category)) % colors.length];
    };
    function hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    }

    const result = data.map(c => ({
      name: c._id,
      amount: c.total,
      percentage: totalSpent ? Math.round((c.total / totalSpent) * 100) : 0,
      color: getCategoryColor(c._id),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch category breakdown", error: err.message });
  }
};