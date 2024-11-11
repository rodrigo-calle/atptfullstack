import { Client } from "./client";
import { User } from "./user";

export enum FileStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface File {
  id: number;
  fileUrl: string;
  status: FileStatus;
  createdAt: Date;
  user: User;
  clients: Client[];
  clientsInFile: number;
}
