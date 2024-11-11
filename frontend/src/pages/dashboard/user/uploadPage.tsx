import { File } from "@/common/types/file";
import { Button } from "@/components/button";
import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { fileServices } from "@/services/files";
import React from "react";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [fileUploaded, setFileUploaded] = React.useState<File | null>(null);
  const [isUploading, setUploading] = React.useState(false);
  const handleUpload = async () => {
    setUploading(true);
    const fileInput = document.getElementById("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      alert("No se ha seleccionado ningún archivo");
    }
    if (file) {
      const response = await fileServices.uploadFile(file);
      setFileUploaded(response);
      alert("Archivo cargado exitosamente");
      fileInput.value = "";
    }
    setUploading(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-3">Subir Archivos de Clientes</h1>
      <div className="w-full h-full flex justify-center items-center flex-col gap-2 mx-2 my-2">
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-10">
          <Label htmlFor="file">Subir Archivo</Label>
          <Input id="file" type="file" accept=".csv" />
          <Button
            type="submit"
            onClick={handleUpload}
            variant="default"
            disabled={isUploading}
          >
            Subir
          </Button>
        </div>
        <div>
          {fileUploaded && (
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-10">
              <Label htmlFor="file">Archivo Cargado</Label>
              <p>id: {fileUploaded.id}</p>
              <p>
                url:{" "}
                <Link
                  className="underline text-blue-500"
                  to={fileUploaded.fileUrl}
                >
                  {fileUploaded.fileUrl}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <Link to="/dashboard/medals" className="text-blue-500 underline">
        Ver mis Medallas
      </Link>
    </div>
  );
};

export default UploadPage;
