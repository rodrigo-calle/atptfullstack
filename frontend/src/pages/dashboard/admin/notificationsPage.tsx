import { Notification } from "@/common/types/notification";
import { Button } from "@/components/button";
import { useNotifications } from "@/hooks/use-notifications";
import { useState } from "react";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
  const { pendingNotifications, notificaciones: notifications } =
    useNotifications();
  const [filteredNotifications, setFilteredNotifications] =
    useState<Notification[]>(notifications);

  const handleFilter = (filter: string) => {
    if (filter === "all") {
      setFilteredNotifications(notifications);
    } else if (filter === "unread") {
      setFilteredNotifications(notifications.filter((n) => !n.readedBy));
    } else {
      setFilteredNotifications(notifications.filter((n) => n.readedBy));
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-3">Notificaciones</h1>
      <p>Tienes {pendingNotifications} notificaciones pendientes</p>
      <div className="w-full h-full flex justify-center flex-row gap-2 mx-2 my-2 ">
        <Button id="all" onClick={() => handleFilter("all")}>
          Todas las notificaciones {`(${notifications.length})`}
        </Button>
        <Button onClick={() => handleFilter("unread")}>
          Notificaciones no leidas {`(${pendingNotifications})`}
        </Button>
        <Button onClick={() => handleFilter("read")}>
          Notificaciones leidas{" "}
          {`(${notifications.length - pendingNotifications})`}
        </Button>
      </div>
      <div className="w-full h-full flex flex-col gap-2 mx-2">
        {filteredNotifications
          .filter((notif) => !notif.readedBy)
          .sort(function (a, b) {
            const dateA = new Date(a.date_prop).getTime();
            const dateB = new Date(b.date_prop).getTime();
            return dateA < dateB ? 1 : -1;
          })
          .map((notification) => (
            <div
              id="card"
              key={notification.id}
              className="w-full h-fit border p-2 rounded "
            >
              <ul>
                <li>Enviado por: {notification.sentBy.username}</li>
                <li>Fecha: {notification.date.toLocaleString()}</li>
                <li>
                  Mensaje: Nuevo documento de clientes subid por
                  {notification.sentBy.username} <br /> url de archivo:
                  <Link
                    className="text-blue-500"
                    to={notification.message.split(" ")[2]}
                  >
                    {notification.message.split(" ")[2]}
                  </Link>{" "}
                </li>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
