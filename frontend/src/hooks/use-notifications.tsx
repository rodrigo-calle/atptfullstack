import { Notification } from "@/common/types/notification";
import { File } from "@/common/types/file";
import { notificationServices } from "@/services/notifications";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export const useNotifications = () => {
  const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
  const [nuevaNotificacion, setNuevaNotificacion] = useState(false);
  const [lastNotification, setLastNotification] = useState<File | null>(null);
  const [pendingNotifications, setPendingNotifications] = useState(0);

  const getNotifications = async (): Promise<void> => {
    const response = await notificationServices.getAdminsNotifications();
    if (!response) {
      return;
    }
    setPendingNotifications(response.filter((n) => !n.readedBy).length);

    setNotificaciones(response);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    socket.on("new-file-notification", (data: File) => {
      setLastNotification(data);
      getNotifications();
      setNuevaNotificacion(true);
    });

    return () => {
      socket.off("new-file-notification");
    };
  }, []);

  const handleNotificacionesClick = () => {
    setNuevaNotificacion(false);
    setLastNotification(null);
  };

  return {
    notificaciones,
    nuevaNotificacion,
    handleNotificacionesClick,
    lastNotification,
    pendingNotifications,
  };
};
