import { Button } from "@/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { authServices } from "../services/auth";

const signInUserSchema = z.object({
  username: z
    .string()
    .max(20, "El nombre de usuario debe tener al menos 5 caracteres")
    .min(5, "El nombre de usuario debe tener al menos 5 caracteres"),
  password: z.string(),
});

const signInIdSchema = z.object({
  id: z.string().min(1, "El ID debe tener al menos 1 caracter"),
});

const SignInPage = () => {
  const [signInType, setSignInType] = useState<"username" | "id" | null>(null);
  const formSchema =
    signInType === "username" ? signInUserSchema : signInIdSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      signInType === "username" &&
      "username" in values &&
      "password" in values
    ) {
      const response = await authServices.signInService(
        values.username,
        values.password
      );
      if (!response) {
        return;
      }

      localStorage.setItem("token", response.access_token);

      window.location.href = "/dashboard";
    }

    if (signInType === "id" && "id" in values) {
      const response = await authServices.signInWithIdService(
        parseInt(values.id)
      );
      if (!response) {
        return;
      }

      localStorage.setItem("token", response.access_token);
    }
  }

  return (
    <main className="relative flex justify-center items-center h-screen w-full bg-[#0f141a] overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-4 z-10">
        {!signInType && (
          <div className="flex flex-col gap-4 items-center justify-center max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold text-white">
              Ingrese al Sistema
            </h1>
            <Button
              className="bg-green-400/90 w-full hover:bg-white hover:text-gray-800"
              onClick={() => setSignInType("username")}
            >
              Continua con Nombre de Usuario
            </Button>
            <Button
              className="w-full hover:bg-green-400"
              variant="outline"
              onClick={() => setSignInType("id")}
            >
              Continua con ID de usuario
            </Button>
          </div>
        )}
        <Form {...form}>
          {signInType === "username" && (
            <form
              className="flex flex-col gap-4 items-center justify-center max-w-[600px] mx-auto"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <h1 className="text-3xl font-bold text-white">
                Ingrese al Sistema
              </h1>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-white">Nombre usuario</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Username"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-white">Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-green-400/90 w-full hover:bg-white hover:text-gray-800">
                Ingresar
              </Button>
              <div className="flex flex-col gap-2 w-full">
                <p className="text-white">
                  No tienes una cuenta?{" "}
                  <Link
                    to={"/signUpPage"}
                    className="text-green-400 hover:text-green-600"
                  >
                    Registrate
                  </Link>
                </p>

                <p
                  className="text-white hover:text-green-400 cursor-pointer"
                  onClick={() => setSignInType("id")}
                >
                  Ingresa con tu ID
                </p>
              </div>
            </form>
          )}
          {signInType === "id" && (
            <form
              className="flex flex-col gap-4 items-center justify-center max-w-[600px] mx-auto"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <h1 className="text-3xl font-bold text-white">
                Ingrese al Sistema
              </h1>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-white">Id de Usuario</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="ID de Usuario"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-green-400/90 w-full hover:bg-white hover:text-gray-800"
                type="submit"
              >
                Ingresar
              </Button>
              <div className="flex flex-col gap-2 w-full">
                <p className="text-white">
                  No tienes una cuenta?{" "}
                  <Link
                    to={"/signup"}
                    className="text-green-400 hover:text-green-600"
                  >
                    Registrate
                  </Link>
                </p>
                <p
                  onClick={() => setSignInType("username")}
                  className="text-white hover:text-green-400 cursor-pointer"
                >
                  Ingresa con tu Nombre de Usuario
                </p>
              </div>
            </form>
          )}
        </Form>
      </div>
      <div className="absolute inset-0 z-0 bg-stars"></div>
    </main>
  );
};

export default SignInPage;
