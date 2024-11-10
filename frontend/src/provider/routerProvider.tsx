import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";

// eslint-disable-next-line no-empty-pattern
const RouterProvider = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
