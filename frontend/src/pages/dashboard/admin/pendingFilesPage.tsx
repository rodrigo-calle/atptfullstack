import { File, FileStatus } from "@/common/types/file";
import { fileServices } from "@/services/files";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";

const PendingFilesPage = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const getPendingFiles = async (): Promise<void> => {
    const fileList = await fileServices.getAllFiles();
    const newFiles = fileList?.filter(
      (file) => file.status === FileStatus.PENDING
    );
    if (!newFiles) {
      return;
    }
    console.log({ newFiles });
    setFiles(newFiles);
  };

  const rejectFiles = async (id: number): Promise<void> => {
    await fileServices.rejectFile(id);
    getPendingFiles();
  };

  const approveFiles = async (id: number): Promise<void> => {
    await fileServices.approveFile(id);
    getPendingFiles();
  };

  useEffect(() => {
    getPendingFiles();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-3">Historial de Usuarios</h1>
      <div className="w-full h-full flex justify-center flex-row gap-2 mx-2 my-2">
        <Table>
          <TableCaption>Todos los usuario registrados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID de Usuario</TableHead>
              <TableHead>Id de Archivo</TableHead>
              <TableHead>Clientes Registrados</TableHead>
              <TableHead>Archivo </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files &&
              files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.user.id}</TableCell>
                  <TableCell>{file.id}</TableCell>
                  <TableCell>{file.clientsInFile}</TableCell>
                  <TableCell>
                    <Link to={file.fileUrl} target="_blank">
                      .csv -{" "}
                      <span className="underline cursor-pointer">
                        Click para descargar
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell className="flex flex-row gap-2 justify-center">
                    <Button onClick={() => approveFiles(file.id)}>
                      Aprobar
                    </Button>
                    <Button onClick={() => rejectFiles(file.id)}>
                      Rechazar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PendingFilesPage;
