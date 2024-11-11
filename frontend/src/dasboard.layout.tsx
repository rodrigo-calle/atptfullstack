import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import {
  SidebarProvider,
  SidebarTrigger,
} from "./components/dashboard/sidebar";
import { AppSidebar } from "./components/dashboard/app-sidebar";
import { useUser } from "./hooks/use-user";

const LayoutDashboard = () => {
  const user = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full w-full">
      <SidebarProvider>
        <AppSidebar user={user} />
        <main className="flex min-h-screen h-full w-full">
          <Suspense fallback={<div>Cargando...</div>}>
            <SidebarTrigger />
            <Outlet />
          </Suspense>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default LayoutDashboard;
