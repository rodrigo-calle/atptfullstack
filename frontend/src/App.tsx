import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import LandingPage from "./pages/landingPage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/sinUpPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/*  <Route path="/contact" element={<ContactPage />} />
        <Route path="/policies" element={<PrivatePolicies />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="*" element={<ErrorPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
