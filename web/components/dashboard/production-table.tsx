import { Search, SlidersHorizontal, MoreHorizontal, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardService } from "@/services/dashboard.service"
import { ProductionItem } from "@/interfaces/dashboard"

export function ProductionTable() {
    const productionData: ProductionItem[] = DashboardService.getProductionItems();

    return (
        <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-gray-900">Data Produksi Terakhir</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Cari berdasarkan Group, Line..."
                                className="h-9 w-full pl-9 bg-gray-50 border-gray-200"
                            />
                        </div>
                    </div>
                    <Button variant="outline" className="h-9 gap-2">
                        Filter
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">Group</th>
                                <th className="px-4 py-3">Shift</th>
                                <th className="px-4 py-3">Line</th>
                                <th className="px-4 py-3">Suhu</th>
                                <th className="px-4 py-3">Berat</th>
                                <th className="px-4 py-3">Kualitas</th>
                                <th className="px-4 py-3">Input</th>
                                <th className="px-4 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {productionData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{item.group}</td>
                                    <td className="px-4 py-3 text-gray-700">{item.shift}</td>
                                    <td className="px-4 py-3 text-gray-700">{item.line}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{item.temperature}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{item.weight}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.quality === 'OK' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.quality}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.inputMethod === 'OCR' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {item.inputMethod}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
