import { File } from "@/common/types/file";
import axios from "axios";

const baseUrl = "http://localhost:3000";
const authToken = localStorage.getItem("token");

const getFilesByUser = async (userId: number) => {
  const bearerToken = `Bearer ${authToken}`;
  const response = await axios.get<File[]>(
    `${baseUrl}/files/clients/${userId}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    }
  );

  if (!response.data) {
    return null;
  }

  return response.data;
};

export const fileServices = {
  getFilesByUser,
};
