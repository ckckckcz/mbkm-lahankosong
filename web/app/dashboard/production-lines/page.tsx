"use client"

import { useState, useEffect } from "react"
import { DashboardService } from "@/services/dashboard.service"
import { ProductionLine } from "@/interfaces/dashboard"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductionLinesPage() {
    const [lines, setLines] = useState<ProductionLine[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState({ name: "", status: "Aktif" })
    const [isConnected, setIsConnected] = useState<boolean | null>(null)

    useEffect(() => {
        fetchLines();
        checkConnection();
    }, []);

    const checkConnection = async () => {
        const status = await DashboardService.checkConnection();
        setIsConnected(status);
    };

    const fetchLines = async () => {
        try {
            const data = await DashboardService.getProductionLines();
            setLines(data);
        } catch (error) {
            console.error("Failed to fetch production lines", error);
        }
    }

    const resetForm = () => {
        setFormData({ name: "", status: "Aktif" });
        setEditingId(null);
        setIsFormOpen(false);
    }

    const handleEdit = (line: ProductionLine) => {
        setFormData({ name: line.name, status: line.status });
        setEditingId(line.id);
        setIsFormOpen(true);
    }

    const handleSave = async () => {
        if (!formData.name.trim()) return

        try {
            if (editingId) {
                const updatedLine = await DashboardService.updateProductionLine(editingId, {
                    name: formData.name,
                    status: formData.status
                });
                setLines(lines.map(l => l.id === editingId ? updatedLine : l));
            } else {
                const newLine = await DashboardService.createProductionLine({
                    name: formData.name,
                    status: "Aktif"
                });
                setLines([newLine, ...lines]);
            }
            resetForm();
        } catch (error) {
            console.error("Failed to save production line", error);
            alert("Gagal menyimpan production line");
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus production line ini?")) {
            try {
                await DashboardService.deleteProductionLine(id);
                setLines(lines.filter(l => l.id !== id))
            } catch (error) {
                console.error("Failed to delete production line", error);
                alert("Gagal menghapus production line");
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Production Line</h1>
                <Button
                    onClick={() => {
                        if (isFormOpen) resetForm();
                        else setIsFormOpen(true);
                    }}
                    className={`gap-2 text-white transition-colors ${isFormOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isFormOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {isFormOpen ? 'Batal' : 'Tambah Line'}
                </Button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingId ? 'Edit Production Line' : 'Tambah Production Line Baru'}
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1 w-full sm:w-auto">
                            <Input
                                placeholder="Nama Line (e.g., Line A)..."
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                                autoFocus
                            />
                        </div>
                        {editingId && (
                            <div className="w-full sm:w-auto">
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                            </div>
                        )}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                                <Save className="h-4 w-4" /> Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 w-[50px]">No</th>
                                <th className="px-6 py-4">Nama Line</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 w-[150px]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {lines.map((line, index) => (
                                <tr key={line.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{line.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${line.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {line.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => handleEdit(line)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(line.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {lines.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data production line.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
