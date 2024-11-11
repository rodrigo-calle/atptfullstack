import axios from "axios";

const baseUrl = "http://localhost:3000";
console.log(baseUrl);

const signInService = async (username: string, password: string) => {
  const response = await axios.post<{
    access_token: string;
  } | null>(`${baseUrl}/auth/signin`, {
    username,
    password,
  });

  if (!response.data) {
    return null;
  }

  return response.data;
};

const signUpService = async (username: string, password: string) => {
  const response = await axios.post<{
    access_token: string;
  } | null>(`${baseUrl}/auth/signup`, {
    username,
    password,
  });

  if (!response.data) {
    return null;
  }

  return response.data;
};

const signInWithIdService = async (id: number) => {
  const response = await axios.post<{
    access_token: string;
  } | null>(`${baseUrl}/auth/signinwithid`, {
    id,
  });

  if (!response.data) {
    return null;
  }

  return response.data;
};

export const authServices = {
  signInService,
  signUpService,
  signInWithIdService,
};
