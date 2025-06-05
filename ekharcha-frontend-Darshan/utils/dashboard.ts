import api from "./api";
export const getDashboardSummary = async () => {
  const res = await api.get("/api/dashboard/dashboard-summary");
  return res.data;
};