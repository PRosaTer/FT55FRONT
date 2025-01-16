import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function PropertyNotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col-reverse content-center items-center justify-center gap-8 bg-slate-300 lg:flex-row lg:p-8">
      <div className="w-full max-w-md px-4 lg:px-0 space-y-8 text-center">
        <h1 className="text-6xl font-bold text-purple-500">ERROR 404</h1>
        <h2 className="text-3xl font-semibold text-black">
          Propiedad no encontrada!
        </h2>
        <p className="text-xl text-gray-300">
          Vuelve pronto para mas opciones...
        </p>

        <div className="flex justify-center">
          <Image
            src="/logoNotFound.png"
            alt="logoNot"
            width={250}
            height={250}
          />
        </div>

        <div className="pt-6">
          <Button
            asChild
            className="mt-6 mb-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold"
          >
            <Link href="/property/filter">
              <div className="mr-2 h-4 w-32">Ir a las propiedades</div>
            </Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          ¿Necesita ayuda? Póngase en contacto con nuestro equipo de atención al
          cliente.
        </p>
      </div>
    </div>
  );
}
