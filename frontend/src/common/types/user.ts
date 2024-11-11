import { Client } from "./client";
import { Notification } from "./notification";
import { File } from "./file";

export enum Medal {
  MADERA = "MADERA",
  MADERA_NO_VERIFICADA = "MADERA_NO_VERIFICADA",
  HIERRO = "HIERRO",
  HIERRO_NO_VERIFICADA = "HIERRO_NO_VERIFICADA",
  BRONCE = "BRONCE",
  BRONCE_NO_VERIFICADA = "BRONCE_NO_VERIFICADA",
  PLATA = "PLATA",
  PLATA_NO_VERIFICADA = "PLATA_NO_VERIFICADA",
  ORO = "ORO",
  ORO_NO_VERIFICADA = "ORO_NO_VERIFICADA",
  PLATINIUM = "PLATINIUM",
  PLATINIUM_NO_VERIFICADA = "PLATINIUM_NO_VERIFICADA",
  DIAMANTE = "DIAMANTE",
  DIAMANTE_NO_VERIFICADA = "DIAMANTE_NO_VERIFICADA",
  INMORTAL = "INMORTAL",
  INMORTAL_NO_VERIFICADA = "INMORTAL_NO_VERIFICADA",
  RADIANTE = "RADIANTE",
  RADIANTE_NO_VERIFICADA = "RADIANTE_NO_VERIFICADA",
}

export interface User {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
  medals?: string | null;
  lastMedal?: string | null;
  clientsRegistered: number;
  newClientsForRegister: number;
  notificationsReaded: Notification[];
  notificationsSentBy: Notification[];
  notificationSentTo: Notification[];
  clientsAproved: Client[];
  clientsUploaded: Client[];
  files: File[];
}
