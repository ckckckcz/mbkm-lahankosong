"use client"

import { useState, useEffect } from "react"
import { DashboardService } from "@/services/dashboard.service"
import { ProductionItem, Group, Shift, ProductionLine } from "@/interfaces/dashboard"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OperationsPage() {
    const [operations, setOperations] = useState<ProductionItem[]>([])
    const [groups, setGroups] = useState<Group[]>([])
    const [shifts, setShifts] = useState<Shift[]>([])
    const [lines, setLines] = useState<ProductionLine[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)

    // Form States
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        group_id: "",
        shift_id: "",
        production_line_id: "",
        temperature: "",
        weight: "",
        quality: "OK",
        inputMethod: "Manual"
    })

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [opsData, groupsData, shiftsData, linesData] = await Promise.all([
                DashboardService.getProductionItems(),
                DashboardService.getGroups(),
                DashboardService.getShifts(),
                DashboardService.getProductionLines()
            ]);
            setOperations(opsData);
            setGroups(groupsData);
            setShifts(shiftsData);
            setLines(linesData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        setFormData({
            date: new Date().toISOString().split('T')[0],
            group_id: "",
            shift_id: "",
            production_line_id: "",
            temperature: "",
            weight: "",
            quality: "OK",
            inputMethod: "Manual"
        });
        setEditingId(null);
        setIsFormOpen(false);
    }

    const handleEdit = (op: ProductionItem) => {
        setFormData({
            date: op.date,
            group_id: op.group_id?.toString() || "",
            shift_id: op.shift_id?.toString() || "",
            production_line_id: op.production_line_id?.toString() || "",
            temperature: op.temperature_val?.toString() || parseFloat(op.temperature).toString() || "",
            weight: op.weight_val?.toString() || parseFloat(op.weight).toString() || "",
            quality: op.quality,
            inputMethod: op.inputMethod
        });
        setEditingId(op.id);
        setIsFormOpen(true);
    }

    const handleSave = async () => {
        if (!formData.group_id || !formData.shift_id || !formData.production_line_id || !formData.temperature || !formData.weight) return

        const payload = {
            date: formData.date,
            group_id: Number(formData.group_id),
            shift_id: Number(formData.shift_id),
            production_line_id: Number(formData.production_line_id),
            temperature: Number(formData.temperature),
            weight: Number(formData.weight),
            quality: formData.quality,
            input_method: formData.inputMethod
        };

        try {
            if (editingId) {
                await DashboardService.updateOperation(editingId, payload);
            } else {
                await DashboardService.createOperation(payload);
            }

            await fetchAllData();
            resetForm();
        } catch (error) {
            console.error("Failed to save operation", error);
            alert("Gagal menyimpan data operasi");
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus data operasi ini?")) {
            try {
                await DashboardService.deleteOperation(id);
                setOperations(operations.filter(op => op.id !== id))
            } catch (error) {
                console.error("Failed to delete operation", error);
                alert("Gagal menghapus data operasi");
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Operasi Produksi</h1>
                <Button
                    onClick={() => {
                        if (isFormOpen) resetForm();
                        else setIsFormOpen(true);
                    }}
                    className={`gap-2 text-white transition-colors ${isFormOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isFormOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {isFormOpen ? 'Batal' : 'Tambah Operasi'}
                </Button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingId ? 'Edit Data Operasi' : 'Input Data Operasi Baru'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label>Tanggal</Label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Group</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.group_id}
                                onChange={(e) => setFormData({ ...formData, group_id: e.target.value })}
                            >
                                <option value="">Pilih Group</option>
                                {groups.map(g => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Shift</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.shift_id}
                                onChange={(e) => setFormData({ ...formData, shift_id: e.target.value })}
                            >
                                <option value="">Pilih Shift</option>
                                {shifts.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Production Line</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.production_line_id}
                                onChange={(e) => setFormData({ ...formData, production_line_id: e.target.value })}
                            >
                                <option value="">Pilih Line</option>
                                {lines.map(l => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Suhu (°C)</Label>
                            <Input
                                type="number"
                                placeholder="85.0"
                                step="0.1"
                                value={formData.temperature}
                                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Berat (kg)</Label>
                            <Input
                                type="number"
                                placeholder="12.5"
                                step="0.1"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Kualitas</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.quality}
                                onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                            >
                                <option value="OK">OK</option>
                                <option value="NOT OK">NOT OK</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Input Method</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.inputMethod}
                                onChange={(e) => setFormData({ ...formData, inputMethod: e.target.value })}
                            >
                                <option value="Manual">Manual</option>
                                <option value="OCR">OCR</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                            <Save className="h-4 w-4" /> Simpan Data
                        </Button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 w-[50px]">No</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Group</th>
                                <th className="px-6 py-4">Shift</th>
                                <th className="px-6 py-4">Line</th>
                                <th className="px-6 py-4">Suhu</th>
                                <th className="px-6 py-4">Berat</th>
                                <th className="px-6 py-4">Kualitas</th>
                                <th className="px-6 py-4">Input</th>
                                <th className="px-6 py-4 w-[100px]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {operations.map((op, index) => (
                                <tr key={op.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{op.date}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{op.group}</td>
                                    <td className="px-6 py-4 text-gray-700">{op.shift}</td>
                                    <td className="px-6 py-4 text-gray-700">{op.line}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{op.temperature}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{op.weight}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${op.quality === 'OK' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {op.quality}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${op.inputMethod === 'OCR' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {op.inputMethod}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => handleEdit(op)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(op.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {operations.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                                        {isLoading ? 'Loading data...' : 'Belum ada data operasi.'}
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
