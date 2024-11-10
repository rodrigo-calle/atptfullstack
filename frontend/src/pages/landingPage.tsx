import { Button } from "@/components/button";

const LandingPage = () => {
  return (
    <main className="relative flex justify-center items-center h-screen w-full bg-[#0f141a] overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-4 z-10">
        <h1 className="text-5xl font-bold text-center text-white w-4/6">
          Desafío de Gestión de Registro y Logros de Usuarios por
          <span className="bg-gradient-to-tl from-green-300 to-green-600/90 bg-clip-text text-transparent dark:from-green-200 dark:to-green-400/90">
            - Rodrigo Calle -
          </span>
        </h1>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button variant="default" className="bg-green-400/90">
            Ver Reto
          </Button>
          <a href="/signin">
            <Button variant="outline">Ingresar</Button>
          </a>
        </div>
        <div className="mx-auto mt-6 h-[1.9px] w-full max-w-4xl bg-gradient-to-r from-transparent via-white to-transparent dark:via-white md:mt-8 "></div>
        <div className="flex justify-center items-center gap-4 mt-4 w-4/6"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-stars"></div>
    </main>
  );
};

export default LandingPage;
