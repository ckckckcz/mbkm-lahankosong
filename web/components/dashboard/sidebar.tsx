"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Database,
    Users,
    Clock,
    Factory,
    ChevronDown,
    ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { SidebarProps } from "@/interfaces/dashboard"

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const [isMasterDataOpen, setIsMasterDataOpen] = useState(true)

    const toggleMasterData = () => {
        setIsMasterDataOpen(!isMasterDataOpen)
    }

    return (
        <div className={cn("pb-12 min-h-screen bg-gray-50 border-r border-gray-200", className)}>
            <div className="space-y-3 py-3">
                <div className="px-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className="w-full rounded-lg">
                            <Image src="/greenfields.png" alt="" width={1920} height={1080} className="w-32 h-full text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2 ">
                    <h2 className="mb-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">
                        Menu
                    </h2>
                    <Link href="/dashboard">
                        <span className={cn(
                            "flex items-center rounded-lg px-3 mb-2 py-2 text-sm font-semibold cursor-pointer transition-colors hover:bg-green-50 hover:text-green-700",
                            pathname === "/dashboard" ? "bg-green-50 text-green-700" : "text-gray-700"
                        )}>
                            <LayoutDashboard className="mr-3 h-4 w-4" />
                            Home
                        </span>
                    </Link>
                    <div>
                        <button
                            onClick={toggleMasterData}
                            className={cn(
                                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer transition-colors hover:bg-green-50 hover:text-green-700",
                                isMasterDataOpen ? "text-green-700" : "text-gray-700"
                            )}
                        >
                            <div className="flex items-center">
                                <Database className="mr-3 h-4 w-4" />
                                Master Data
                            </div>
                            {isMasterDataOpen ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                        {isMasterDataOpen && (
                            <div className="relative ml-6 mt-1">
                                <div className="absolute left-0 top-0 bottom-4 w-px bg-gray-200"></div>

                                {[
                                    { href: "/dashboard/groups", label: "Groups", icon: Users },
                                    { href: "/dashboard/shifts", label: "Shifts", icon: Clock },
                                    { href: "/dashboard/production-lines", label: "Production Lines", icon: Factory }
                                ].map((item, index, array) => (
                                    <div key={item.href} className="relative">
                                        <Link
                                            href={item.href}
                                            className="flex items-center h-9 pl-8 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
                                        >
                                            <div className="absolute left-0 top-0 h-[18px] w-5 border-l border-b border-gray-200 rounded-bl-xl"></div>
                                            <span className={cn(
                                                "text-sm font-medium transition-colors",
                                                pathname === item.href ? "text-green-700 font-semibold" : ""
                                            )}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}
