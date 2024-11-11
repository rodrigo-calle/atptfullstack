import { User } from "@/common/types/user";
import React from "react";
import * as jd from "jwt-decode";
import { userServices } from "@/services/user";

export const useUser = () => {
  const [user, setUser] = React.useState<null | User>(null);

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

  const getUserProfile = async (userId: number): Promise<void> => {
    const user = await userServices.getUserProfileService(userId);

    if (!user) {
      setUser(null);
      return;
    }

    setUser(user);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    const tokenDecoded = decodedToken(token);
    if (!tokenDecoded) return;

    getUserProfile(tokenDecoded.userId);
  }, []);

  return user;
};
