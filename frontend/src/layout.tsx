import { Outlet } from "react-router-dom";

import { Suspense } from "react";
import Navbar from "./components/navbar";

const Layout = () => {
  return (
    <div className="min-h-screen h-full w-full">
      <Navbar />
      <Suspense>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};

export default Layout;
