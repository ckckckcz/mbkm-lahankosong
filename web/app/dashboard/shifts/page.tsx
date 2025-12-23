"use client"

import { useState } from "react"
import { DashboardService } from "@/services/dashboard.service"
import { Shift } from "@/interfaces/dashboard"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ShiftsPage() {
    const [shifts, setShifts] = useState<Shift[]>(DashboardService.getShifts())
    const [isAdding, setIsAdding] = useState(false)
    const [newShiftName, setNewShiftName] = useState("")
    const [startTime, setStartTime] = useState("08:00")
    const [endTime, setEndTime] = useState("16:00")

    const handleAdd = () => {
        if (!newShiftName.trim()) return
        const newShift: Shift = {
            id: shifts.length + 1,
            name: newShiftName,
            startTime: startTime,
            endTime: endTime,
            status: "Aktif"
        }
        setShifts([...shifts, newShift])
        setNewShiftName("")
        setStartTime("08:00")
        setEndTime("16:00")
        setIsAdding(false)
    }

    const handleDelete = (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus shift ini?")) {
            setShifts(shifts.filter(s => s.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Shift</h1>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`gap-2 text-white transition-colors ${isAdding ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {isAdding ? 'Batal' : 'Tambah Shift'}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tambah Shift Baru</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-2">
                            <Label>Nama Shift</Label>
                            <Input
                                placeholder="e.g., Shift 1"
                                value={newShiftName}
                                onChange={(e) => setNewShiftName(e.target.value)}
                                className="bg-white"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Jam Mulai</Label>
                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Jam Selesai</Label>
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="bg-white"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button onClick={handleAdd} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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
                                        {shift.startTime} - {shift.endTime}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shift.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {shift.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
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
