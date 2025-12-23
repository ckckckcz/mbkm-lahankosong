import { Bell } from "lucide-react"
import Image from "next/image"
import { MobileNav } from "./mobile-nav"

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6 justify-between lg:justify-end">
            <MobileNav />

            <div className="flex items-center gap-4">
                <button className="relative rounded-full bg-gray-50 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600 border-2 border-white" />
                </button>
                <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                    <Image
                        src="https://api.dicebear.com/9.x/lorelei/svg?seed=Emily"
                        alt="User"
                        width={32}
                        height={32}
                        className="rounded-full bg-gray-100 ring-2 ring-gray-100"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-gray-900">Emily Chen</p>
                        <p className="text-xs text-gray-500">Production Manager</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
