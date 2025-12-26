"use client"

import { useState, useEffect } from "react"
import { DashboardService } from "@/services/dashboard.service"
import { Shift } from "@/interfaces/dashboard"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ShiftsPage() {
    const [shifts, setShifts] = useState<Shift[]>([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        start_time: "08:00",
        end_time: "16:00",
        status: "Aktif"
    })
    const [isConnected, setIsConnected] = useState<boolean | null>(null)

    useEffect(() => {
        fetchShifts();
        checkConnection();
    }, []);

    const checkConnection = async () => {
        const status = await DashboardService.checkConnection();
        setIsConnected(status);
    };

    const fetchShifts = async () => {
        try {
            const data = await DashboardService.getShifts();
            setShifts(data);
        } catch (error) {
            console.error("Failed to fetch shifts", error);
        }
    }

    const resetForm = () => {
        setFormData({ name: "", start_time: "08:00", end_time: "16:00", status: "Aktif" });
        setEditingId(null);
        setIsFormOpen(false);
    }

    const handleEdit = (shift: Shift) => {
        setFormData({
            name: shift.name,
            start_time: shift.start_time,
            end_time: shift.end_time,
            status: shift.status
        });
        setEditingId(shift.id);
        setIsFormOpen(true);
    }

    const handleSave = async () => {
        if (!formData.name.trim()) return

        try {
            if (editingId) {
                const updatedShift = await DashboardService.updateShift(editingId, {
                    name: formData.name,
                    start_time: formData.start_time,
                    end_time: formData.end_time,
                    status: formData.status
                }); // Check if DashboardService.updateShift exists/is generic enough
                // It calls PUT /shifts/:id. I need to make sure I added updateShift to DashboardService... 
                // Wait, I only added updateOperation and updateGroup.
                // I need to add updateShift and updateProductionLine to DashboardService!
                // I will add them in the next step or patch this file assuming they exist and then fix Service.

                // Assuming service will be fixed:
                setShifts(shifts.map(s => s.id === editingId ? updatedShift : s));
            } else {
                const newShift = await DashboardService.createShift({
                    name: formData.name,
                    start_time: formData.start_time,
                    end_time: formData.end_time,
                    status: "Aktif"
                });
                setShifts([newShift, ...shifts]);
            }
            resetForm();
        } catch (error) {
            console.error("Failed to save shift", error);
            alert("Gagal menyimpan shift");
        }
    }

    const handleDelete = async (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus shift ini?")) {
            try {
                await DashboardService.deleteShift(id);
                setShifts(shifts.filter(s => s.id !== id))
            } catch (error) {
                console.error("Failed to delete shift", error);
                alert("Gagal menghapus shift");
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Shift</h1>
                    {isConnected !== null && (
                        <span className={`text-xs font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                            {isConnected ? '• Connected to Supabase' : '• Not connected to Supabase'}
                        </span>
                    )}
                </div>
                <Button
                    onClick={() => {
                        if (isFormOpen) resetForm();
                        else setIsFormOpen(true);
                    }}
                    className={`gap-2 text-white transition-colors ${isFormOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isFormOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {isFormOpen ? 'Batal' : 'Tambah Shift'}
                </Button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingId ? 'Edit Shift' : 'Tambah Shift Baru'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label>Nama Shift</Label>
                            <Input
                                placeholder="e.g., Shift 1"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Jam Mulai</Label>
                            <Input
                                type="time"
                                value={formData.start_time}
                                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Jam Selesai</Label>
                            <Input
                                type="time"
                                value={formData.end_time}
                                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                                className="bg-white"
                            />
                        </div>
                        {editingId && (
                            <div className="space-y-2">
                                <Label>Status</Label>
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
                        <div className="flex items-end">
                            <Button onClick={handleSave} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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
                                <th className="px-6 py-4">Nama Shift</th>
                                <th className="px-6 py-4">Jam Operasional</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 w-[150px]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {shifts.map((shift, index) => (
                                <tr key={shift.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{shift.name}</td>
                                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                                        {shift.start_time} - {shift.end_time}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shift.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {shift.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => handleEdit(shift)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(shift.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {shifts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data shift.
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
