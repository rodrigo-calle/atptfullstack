import { Notification } from "@/common/types/notification";
import axios from "axios";

const baseUrl = "http://localhost:3000";

const getAdminsNotifications = async () => {
  const response = await axios.get<Notification[]>(
    `${baseUrl}/notifications/admins`
  );

  if (!response.data) {
    return null;
  }

  return response.data;
};

export const notificationServices = {
  getAdminsNotifications,
};
