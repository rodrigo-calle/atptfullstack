import { Outlet } from "react-router-dom";

import { Suspense } from "react";
import Navbar from "./components/navbar";

const Layout = () => {
  return (
    <div className="min-h-screen h-full w-full">
      <Navbar />
      <Suspense>
        {/* <Stack
          maxWidth="1280px"
          minWidth="275px"
          m="auto"
          position="relative"
          zIndex={5}
        > */}
        <main>
          <Outlet />
        </main>
        {/* </Stack>
        <Footer /> */}
      </Suspense>
    </div>
  );
};

export default Layout;
