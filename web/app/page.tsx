
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingNavbar } from "@/components/navbar";
import { HeroCards } from "@/components/hero-cards";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-slate-50 text-black font-sans selection:bg-green-100 selection:text-green-900 overflow-hidden">
      <FloatingNavbar />
      <div className="flex-1 flex flex-col lg:items-center justify-center px-4 sm:px-6 lg:px-8 relative w-full h-full lg:pt-20">
        <div className="absolute top-0 left-0 w-full h-[70%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50/80 via-white to-slate-50 -z-10" />
        <div className="max-w-4xl lg:text-center space-y-6 relative z-10 mb-8 md:mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Operasi Data Terpusat untuk <span className="block text-green-700/80 mt-1">PT. Greenfields Indonesia</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Mengintegrasikan aliran data dari pertanian hingga ke meja makan secara mulus. Pantau efisiensi operasional, kontrol kualitas, dan logistik dalam satu platform terpadu.
          </p>

          <div className="flex flex-col sm:flex-row items-start justify-start lg:items-center lg:justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl shadow-green-200/50 hover:shadow-2xl hover:shadow-green-300/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              Unduh Aplikasi <Smartphone className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
        <HeroCards />
      </div>
    </div>
  );
}
