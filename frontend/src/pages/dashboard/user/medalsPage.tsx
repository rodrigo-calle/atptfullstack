import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MedalsPage = () => {
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  
    if (!user) {
      return <div>Loading...</div>;
    }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mt-3">Mis Medallas</h1>
      <div className="w-full h-full flex justify-center items-center flex-col gap-2 mx-2 my-2">
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-10"></div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-10 broder rounded"></div>
      </div>
      <Link to="/dashboard/upload" className="text-blue-500 underline">
        Subir nuevo archivo de clientes
      </Link>
    </div>
  );
};

export default MedalsPage;
