import React from "react";
import jd from "jwt-decode";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);

  const decodedToken = (
    token: string
  ): {
    username: string;
    isAdmin: boolean;
    userId: number;
  } | null => {
    if (token) {
      return jd.jwtDecode(token);
    }
    return null;
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAdmin(false);
      return;
    }

    const tokenDecoded = decodedToken(token);

    if (!tokenDecoded) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(tokenDecoded.isAdmin);
  }, []);

  return isAdmin;
};
