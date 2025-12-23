
import { Button } from "@/components/ui/button";

export function FloatingNavbar() {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="flex items-center justify-between w-full max-w-6xl bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-3.5">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-gray-900">Greenfields</span>
                </div>

                <div className="flex items-center gap-3">
                    <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl px-5 h-9 text-sm shadow-md shadow-gray-200">
                        Akses Portal
                    </Button>
                </div>
            </nav>
        </div>
    );
}
