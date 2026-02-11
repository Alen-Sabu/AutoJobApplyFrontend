import toast from "react-hot-toast";
import { backendApi } from "@/lib/axios";

export const fetchData = async (endpoint: string, params: Record<string, unknown> = {}) => {
  try {
    const response = await backendApi.get(endpoint, { params });
    return response.data;
  } catch (error: unknown) {
    toast.error("Error fetching data");
    throw error;
  }
};

export const postData = async (endpoint: string, data: unknown) => {
  try {
    const response = await backendApi.post(endpoint, data);
    return response.data;
  } catch (error: unknown) {
    toast.error("Error creating");
    throw error;
  }
};

export const putData = async (endpoint: string, data: unknown) => {
  try {
    const response = await backendApi.put(endpoint, data);
    return response.data;
  } catch (error: unknown) {
    toast.error("Error updating data");
    throw error;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const response = await backendApi.delete(endpoint);
    return response.data;
  } catch (error: unknown) {
    toast.error("Error deleting data");
    throw error;
  }
};

export default backendApi;
