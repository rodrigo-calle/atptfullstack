import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import React, { useEffect } from "react";
import { fileServices } from "@/services/files";
import { File } from "@/common/types/file";
import { User } from "@/common/types/user";

const UserPersonalHistoricPage = () => {
  const { id } = useParams<{ id: string }>();
  const [files, setFiles] = React.useState<File[]>([]);

  const getUserHistoricFiles = async (): Promise<File[] | null> => {
    if (!id) return null;

    return await fileServices.getFilesByUser(Number(id));
  };

  const getMedal = (user: User) => {
    const medal = JSON.parse(user.medals as string);
    const lastElement = medal.slice(-1)[0];
    const { name, verified } = lastElement;
    return {
      name,
      verified,
    };
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fileList = await getUserHistoricFiles();
      const newFiles = fileList?.map((file) => ({
        ...file,
        lastMedal: file.user.lastMedal
          ? file.user.lastMedal
          : `${getMedal(file.user).name} - Verificado: ${
              getMedal(file.user).verified
            }`,
      }));

      setFiles(newFiles || []);
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!id) {
    return (
      <div>
        <h1>Historial del Usuario</h1>
        <p>Mostrando historial para el usuario con ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-3">Historial del Usuario</h1>
      <p>Mostrando historial para el usuario con ID: {id}</p>
      <div className="w-full h-full flex justify-center flex-row gap-2 mx-2 my-2">
        <Table>
          <TableCaption>Todos los usuario registrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID de Usuario</TableHead>
              <TableHead>Nombre de Usuario</TableHead>
              <TableHead>Clientes Registrados</TableHead>
              <TableHead>Medal </TableHead>
              <TableHead className="text-right">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((fileReg) => (
              <TableRow key={fileReg.id}>
                <TableCell className="font-medium">{fileReg.user.id}</TableCell>
                <TableCell>{fileReg.user.username}</TableCell>
                <TableCell>{fileReg.clientsInFile}</TableCell>
                <TableCell>
                  {!fileReg.user.lastMedal
                    ? "Aún alcanza medalla"
                    : fileReg.user.lastMedal}
                </TableCell>
                <TableCell className="text-right">{fileReg.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserPersonalHistoricPage;
