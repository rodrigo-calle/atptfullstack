import { User } from "@/common/types/user";
import { Button } from "@/components/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { userServices } from "@/services/user";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UserHistoricPage = () => {
  const [users, setUsers] = React.useState<User[] | null>(null);

  const getUsersNoAdmins = async (): Promise<User[] | null> => {
    return await userServices.getUsersNoAdminService();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsersNoAdmins();
      setUsers(users);
    };
    fetchUsers();
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
              <TableHead>Nombre de Usuario</TableHead>
              <TableHead>Clientes Registrados</TableHead>
              <TableHead>Medal </TableHead>
              <TableHead className="text-right">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.clientsRegistered}</TableCell>
                  <TableCell>
                    {!user.lastMedal ? "Aún alcanza medalla" : user.lastMedal}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/dashboard/userHistoric/${user.id}`}>
                      <Button>Ir</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default UserHistoricPage;
