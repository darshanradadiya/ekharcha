import api from "./api";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getMonthlyReport = async (period: string) => {
  const res = await api.get(`/api/reports/monthly?period=${period}`);
  return res.data.map((item: any) => ({
    month: monthNames[(item._id.month || 1) - 1],
    income: item.income || 0,
    expenses: item.expense || 0,
  }));
};

export const getCategoryBreakdown = async (period: string) => {
  const res = await api.get(`/api/reports/category-breakdown?period=${period}`);
  return res.data;
};