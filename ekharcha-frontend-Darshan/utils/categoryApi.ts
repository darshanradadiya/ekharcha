import api from "./api";

export interface Category {
  id: string;
  label: string;
  type: string;
  [key: string]: any;
}

export const getCategories = async (): Promise<Category[]> =>
  (await api.get<{ categories: Category[] }>("/api/categories")).data.categories;

export const createCategory = async (category: Partial<Category>): Promise<Category> =>
  (await api.post<{ category: Category }>("/api/categories", category)).data.category;

export const updateCategory = async (
  id: string,
  category: Partial<Category>
): Promise<Category> =>
  (await api.put<{ category: Category }>(`/api/categories/${id}`, category)).data.category;

export const deleteCategory = async (
  id: string
): Promise<{ success: boolean; message?: string }> =>
  (await api.delete<{ success: boolean; message?: string }>(`/api/categories/${id}`)).data;

export const getCategoriesByType = async (type: string): Promise<Category[]> =>
  (await api.get<{ categories: Category[] }>(`/api/categories/type/${type}`)).data.categories;