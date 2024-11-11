import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import LandingPage from "./pages/landingPage";
import SignInPage from "./pages/signInPage";
import FilesPage from "./pages/dashboard/admin/filesPage";
import LayoutDashboard from "./dasboard.layout";
import SignUpPage from "./pages/sinUpPage";
import { useIsAuthenticated } from "./hooks/is-authenticated";
import NotificationsPage from "./pages/dashboard/admin/notificationsPage";
import UserHistoricPage from "./pages/dashboard/admin/userHistoricPage";
import UserPersonalHistoricPage from "./pages/dashboard/admin/userPersonalHistoricPage";
import PendingFilesPage from "./pages/dashboard/admin/pendingFilesPage";

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
      {isAuthenticated && (
        <Route path="/dashboard" element={<LayoutDashboard />}>
          <Route index element={<FilesPage />} />
          <Route path="pendingFiles" element={<PendingFilesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="userHistoric" element={<UserHistoricPage />} />
          <Route
            path="userHistoric/:id"
            element={<UserPersonalHistoricPage />}
          />
        </Route>
      )}
    </Routes>
  );
}

export default App;
