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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const signUpUserSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El Nombre de Usuario debe tener al menos 2 caracteres",
    })
    .max(30, {
      message: "El Nombre de Usuario debe tener menos de 30 caracteres",
    }),
  password: z
    .string()
    .min(8, { message: "La Contraseña debe tener al menos 8 caracteres" })
    .max(30, { message: "La Contraseña debe tener menos de 30 caracteres" }),
});

const SignUpPage = () => {
  const form = useForm<z.infer<typeof signUpUserSchema>>({
    resolver: zodResolver(signUpUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpUserSchema>) {
    console.log({ values });
  }
  return (
    <main className="relative flex justify-center items-center h-screen w-full bg-[#0f141a] overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-4 z-10">
        <h1 className="text-3xl font-bold text-white">
          Registrarte en el Sistema
        </h1>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 items-center justify-center max-w-[600px] mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                Ya tienes una cuenta?{" "}
                <Link
                  to={"/signin"}
                  className="text-green-400 hover:text-green-600"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
      <div className="absolute inset-0 z-0 bg-stars"></div>
    </main>
  );
};

export default SignUpPage;
