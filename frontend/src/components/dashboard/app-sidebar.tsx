import {
  ChevronUp,
  User2,
  Bell,
  Upload,
  Medal,
  UserCircle,
  FileArchive,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdownmenu";
import { User } from "@/common/types/user";
import { useNotifications } from "@/hooks/use-notifications";

type Props = {
  user: User;
};

const items = [
  {
    title: "Importar Clientes",
    url: "#",
    icon: Upload,
    userType: "user",
  },
  {
    title: "Medallas",
    url: "#",
    icon: Medal,
    userType: "user",
  },
  {
    title: "Archivos Pendientes",
    url: "#",
    icon: FileArchive,
    userType: "admin",
  },
  {
    title: "Historial de Usuarios",
    url: "/dashboard/userHistoric",
    icon: UserCircle,
    userType: "admin",
  },
  {
    title: "Notificaciones",
    url: "#",
    icon: Bell,
    userType: "both",
  },
];

export function AppSidebar({ user }: Props) {
  const {
    pendingNotifications,
    handleNotificacionesClick,
    nuevaNotificacion: newNotification,
  } = useNotifications();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleActions = (name: string) => {
    if (name === "Notificaciones") {
      handleNotificacionesClick();
      window.scrollTo(0, 0);
      window.location.href = "/dashboard/notifications";
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user.isAdmin ? "Dashboard Administrador" : "Dashboard Usuario"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((listItem) =>
                  user.isAdmin
                    ? listItem.userType === "admin" ||
                      listItem.userType === "both"
                    : listItem.userType === "user"
                )
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => handleActions(item.title)}
                    >
                      <a href={item.url}>
                        <item.icon
                          className={`${
                            item.title === "Notificaciones"
                              ? "font-bold text-red-500"
                              : ""
                          }`}
                        />
                        <span
                          className={`${
                            item.title === "Notificaciones"
                              ? "font-bold text-red-500"
                              : ""
                          }`}
                        >
                          {item.title === "Notificaciones" &&
                          pendingNotifications > 0
                            ? `${item.title} (${pendingNotifications})`
                            : item.title}
                        </span>
                        {item.title === "Notificaciones" && newNotification && (
                          <div className="absolute -top-5 -right-1 w-fit h-fit p-2 bg-red-500 rounded-full">
                            <p className="text-xs text-white text-center">
                              Nueva <br /> notificación
                            </p>
                          </div>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
