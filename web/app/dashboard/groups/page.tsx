"use client"

import { useState } from "react"
import { DashboardService } from "@/services/dashboard.service"
import { Group } from "@/interfaces/dashboard"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function GroupsPage() {
    const [groups, setGroups] = useState<Group[]>(DashboardService.getGroups())
    const [isAdding, setIsAdding] = useState(false)
    const [newGroupName, setNewGroupName] = useState("")

    const handleAdd = () => {
        if (!newGroupName.trim()) return
        const newGroup: Group = {
            id: groups.length + 1,
            name: newGroupName,
            status: "Aktif"
        }
        setGroups([...groups, newGroup])
        setNewGroupName("")
        setIsAdding(false)
    }

    const handleDelete = (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus group ini?")) {
            setGroups(groups.filter(g => g.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Group</h1>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`gap-2 text-white transition-colors ${isAdding ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {isAdding ? 'Batal' : 'Tambah Group'}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tambah Group Baru</h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1 w-full sm:w-auto">
                            <Input
                                placeholder="Nama Group Baru (e.g., Group Alpha)..."
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                className="bg-white border-gray-300 focus:border-green-500 focus:ring-green-500"
                                autoFocus
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button onClick={handleAdd} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
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
                                <th className="px-6 py-4">Nama Group</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 w-[150px]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {groups.map((group, index) => (
                                <tr key={group.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{group.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${group.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {group.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(group.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {groups.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data group.
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
