import { File as FileType } from "@/common/types/file";
import axios from "axios";

const baseUrl = "http://localhost:3000";
const authToken = localStorage.getItem("token");

const uploadFile = async (file: File) => {
  const bearerToken = `Bearer ${authToken}`;
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<FileType>(
    `${baseUrl}/files/clients/upload`,
    formData,
    {
      headers: {
        Authorization: bearerToken,
      },
    }
  );
  return response.data;
};

const getFilesByUser = async (userId: number) => {
  const bearerToken = `Bearer ${authToken}`;
  const response = await axios.get<FileType[]>(
    `${baseUrl}/files/clients/${userId}`,
    {
      headers: {
        Authorization: bearerToken,
      },
    }
  );

  if (!response.data) {
    return null;
  }

  return response.data;
};

const approveFile = async (fileId: number) => {
  const bearerToken = `Bearer ${authToken}`;
  const response = await axios.patch<FileType>(
    `${baseUrl}/files/approve/${fileId}`,
    {},
    {
      headers: {
        Authorization: bearerToken,
      },
    }
  );

  return response;
};

const rejectFile = async (fileId: number) => {
  const bearerToken = `Bearer ${authToken}`;
  const response = await axios.patch<FileType>(
    `${baseUrl}/files/reject/${fileId}`,
    {},
    {
      headers: {
        Authorization: bearerToken,
      },
    }
  );
  return response;
};

const getAllFiles = async () => {
  const bearerToken = `Bearer ${authToken}`;
  const response = await axios.get<FileType[]>(`${baseUrl}/files`, {
    headers: {
      Authorization: bearerToken,
    },
  });

  if (!response.data) {
    return null;
  }
  console.log(response.data);
  return response.data;
};

export const fileServices = {
  getFilesByUser,
  getAllFiles,
  approveFile,
  rejectFile,
  uploadFile,
};
