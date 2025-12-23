
import Image from "next/image";
import { Check, Server, Activity, BarChart3, Cloud, Factory, Truck } from "lucide-react";

export function HeroCards() {
    return (
        <div className="relative w-full max-w-5xl h-[350px] md:h-[400px] flex items-center justify-center perspective-[2000px] mt-10">

            {/* Card 1: Left - Orbiting Data Sources */}
            <div className="absolute left-[5%] md:left-[5%] top-10 md:top-8 z-10 animate-in slide-in-from-left-24 duration-1000 fade-in fill-mode-both">
                <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 w-[290px] h-[330px] transform -rotate-[5deg] hover:rotate-0 transition-all duration-500 group flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Concentric Circles */}
                        <div className="absolute inset-0 m-auto w-64 h-64 border border-gray-100 rounded-full" />
                        <div className="absolute inset-0 m-auto w-44 h-44 border border-gray-100 rounded-full" />
                    </div>

                    <div className="relative h-full w-full flex items-center justify-center z-20">
                        {/* Center Logo */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm relative z-20">
                            <Image
                                src="/greenfields.png"
                                alt="Greenfields Logo"
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                        </div>

                        <div className="absolute top-4 left-4 p-2.5 bg-green-800 rounded-xl shadow-md hover:scale-110 transition-transform">
                            <Factory className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute top-6 right-6 p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm hover:scale-110 transition-transform">
                            <Cloud className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="absolute bottom-6 left-6 p-2.5 bg-blue-600 rounded-xl shadow-md hover:scale-110 transition-transform">
                            <Truck className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute bottom-4 right-6 p-2.5 bg-orange-400 rounded-xl shadow-md hover:scale-110 transition-transform">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 3: Right - Operations Log */}
            <div className="absolute right-[5%] md:right-[5%] top-12 md:top-8 z-10 animate-in slide-in-from-right-24 duration-1000 fade-in fill-mode-both delay-200">
                <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 w-[290px] h-[330px] transform rotate-[5deg] hover:rotate-0 transition-all duration-500 flex flex-col">
                    <div className="mb-6">
                        <h3 className="font-bold text-xl text-gray-900">Log Aktivitas</h3>
                        <p className="text-xs text-gray-400 leading-tight mt-1">Sinkronisasi data real-time.</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-between pb-2">
                        <div className="flex items-center gap-3 group p-2 hover:bg-gray-50 rounded-xl transition-colors -mx-2">
                            <div className="bg-green-100/50 rounded-lg p-2">
                                <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-sm text-gray-800">Produksi Peternakan A</div>
                                <div className="text-[10px] text-gray-400 font-medium">Disinkronkan • 2 mnt lalu</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group p-2 hover:bg-gray-50 rounded-xl transition-colors -mx-2">
                            <div className="bg-blue-100/50 rounded-lg p-2">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-sm text-gray-800">Unggah Laporan QC</div>
                                <div className="text-[10px] text-gray-400 font-medium">Memproses • 5 mnt lalu</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group p-2 hover:bg-gray-50 rounded-xl transition-colors -mx-2 opacity-70">
                            <div className="bg-gray-100/50 rounded-lg p-2">
                                <Server className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-sm text-gray-800">Cadangan Harian</div>
                                <div className="text-[10px] text-gray-400 font-medium">Selesai • 1 jam lalu</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2: Center - System Status */}
            <div className="relative z-30 animate-in zoom-in-95 duration-1000 fade-in fill-mode-both delay-100">
                <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 w-[290px] h-[330px] transition-transform duration-500 hover:scale-[1.02] flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-green-900/10">
                            <div className="w-8 h-8 rounded-full border-[3px] border-green-500/50 flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-base">Gudang Utama</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Beroperasi</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100/50 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-sm text-slate-700">Optimalisasi Penyimpanan</span>
                            <div className="bg-green-600 w-6 h-6 rounded-lg flex items-center justify-center shadow-sm">
                                <BarChart3 className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>

                        <div className="flex gap-1.5 h-2 mb-4 overflow-hidden rounded-full bg-gray-200/50">
                            <div className="flex-1 bg-green-600 rounded-full" />
                            <div className="flex-1 bg-green-600 rounded-full" />
                            <div className="flex-1 bg-green-600/50 rounded-full" />
                            <div className="flex-1 bg-gray-200/50 rounded-full" />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                            Throughput saat ini stabil. Jadwal cadangan pukul 02:00. Tidak ada anomali.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
