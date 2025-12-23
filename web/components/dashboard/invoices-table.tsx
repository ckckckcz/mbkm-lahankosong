import { Search, SlidersHorizontal, MoreHorizontal, Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const invoices = [
    {
        id: "INV-0001",
        client: "Ethan Mitchell",
        email: "@ethanmitchell@gmail.com",
        date: "20 Nov, 2023",
        amount: "$632",
        status: "Paid",
        statusColor: "bg-emerald-100 text-emerald-700"
    },
    {
        id: "INV-0002",
        client: "Adrian Carter",
        email: "@adriancarter@gmail.com",
        date: "21 Nov, 2023",
        amount: "$632",
        status: "Pending",
        statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
        id: "INV-0003",
        client: "Marcus Turner",
        email: "@marcusturner@gmail.com",
        date: "22 Nov, 2023",
        amount: "$632",
        status: "Unpaid",
        statusColor: "bg-purple-100 text-purple-700"
    },
    {
        id: "INV-0004",
        client: "Nolan Foster",
        email: "@nolanfoster@gmail.com",
        date: "23 Nov, 2023",
        amount: "$632",
        status: "Paid",
        statusColor: "bg-emerald-100 text-emerald-700"
    },
    {
        id: "INV-0005",
        client: "Leo Parker",
        email: "@leoparker@gmail.com",
        date: "24 Nov, 2023",
        amount: "$632",
        status: "Pending",
        statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
        id: "INV-0006",
        client: "Garrett Evans",
        email: "@garrettevans@gmail.com",
        date: "25 Nov, 2023",
        amount: "$632",
        status: "Unpaid",
        statusColor: "bg-purple-100 text-purple-700"
    },
    {
        id: "INV-0007",
        client: "Henry Nelson",
        email: "@henrynelson@gmail.com",
        date: "26 Nov, 2023",
        amount: "$632",
        status: "Paid",
        statusColor: "bg-emerald-100 text-emerald-700"
    },
]

export function InvoicesTable() {
    return (
        <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">Invoices</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 gap-2">
                        <Download className="h-4 w-4" />
                        Import
                    </Button>
                    <Button className="h-9 gap-2 bg-green-900 hover:bg-green-800 text-white">
                        <Plus className="h-4 w-4" />
                        New Invoice
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                        {["All Invoices", "Drafts", "Unpaid", "Paid", "Pending"].map((tab, i) => (
                            <button
                                key={tab}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${i === 0 ? "text-gray-900 bg-gray-100" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {tab}
                                {i > 0 && <span className={`ml-2 px-1.5 py-0.5 text-[10px] rounded-full ${i === 1 ? "bg-red-100 text-red-600" :
                                    i === 2 ? "bg-purple-100 text-purple-600" :
                                        i === 3 ? "bg-green-100 text-green-600" :
                                            "bg-yellow-100 text-yellow-600"
                                    }`}>{i * 2 + 1}</span>}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search..."
                                className="h-9 w-[200px] pl-9 bg-gray-50 border-gray-200"
                            />
                        </div>
                        <Button variant="outline" className="h-9 gap-2">
                            Filter
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3 w-[40px]">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="px-4 py-3">Invoice ID</th>
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 w-[40px]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{invoice.id}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{invoice.client}</td>
                                    <td className="px-4 py-3 text-gray-500">{invoice.email}</td>
                                    <td className="px-4 py-3 text-gray-500 font-medium">{invoice.date}</td>
                                    <td className="px-4 py-3 font-bold text-gray-900">{invoice.amount}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${invoice.statusColor}`}>
                                            {invoice.status}
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
