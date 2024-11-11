import { User } from "@/common/types/user";
import axios from "axios";

const baseUrl = "http://localhost:3000";
const authToken = localStorage.getItem("token");

const getUserProfileService = async (userId: number) => {
  const bearerToken = `Bearer ${authToken}`;
  const response = await axios.get<User>(`${baseUrl}/users/profile/${userId}`, {
    headers: {
      Authorization: bearerToken,
    },
  });

  if (!response.data) {
    return null;
  }

  return response.data;
};

const getUsersNoAdminService = async () => {
  const bearerToken = `Bearer ${authToken}`;
  const response = await axios.get<User[]>(`${baseUrl}/users/no-admin`, {
    headers: {
      Authorization: bearerToken,
    },
  });

  if (!response.data) {
    return null;
  }

  return response.data;
};

export const userServices = {
  getUserProfileService,
  getUsersNoAdminService,
};
