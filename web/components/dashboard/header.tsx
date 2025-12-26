"use client"

import { Bell, LogOut, ChevronDown } from "lucide-react"
import Image from "next/image"
import { MobileNav } from "./mobile-nav"
import { useState } from "react"

import { useRouter } from "next/navigation"
import { AuthService } from "@/services/auth.service"

export function DashboardHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleLogout = () => {
        AuthService.logout()
        setIsOpen(false)
        router.replace('/login')
    }

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6 justify-between lg:justify-end">
            <MobileNav />

            <div className="flex items-center gap-4">
                <button className="relative rounded-full bg-gray-50 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600 border-2 border-white" />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-r-lg transition-colors py-1"
                    >
                        <Image
                            src="https://api.dicebear.com/9.x/lorelei/svg?seed=Emily"
                            alt="User"
                            width={32}
                            height={32}
                            className="rounded-full bg-gray-100 ring-2 ring-gray-100"
                        />
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-gray-900">Emily Chen</p>
                            <p className="text-xs text-gray-500">Production Manager</p>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                                    <p className="text-sm font-semibold text-gray-900">Emily Chen</p>
                                    <p className="text-xs text-gray-500">Production Manager</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
