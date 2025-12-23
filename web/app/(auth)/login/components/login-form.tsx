"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function LoginForm() {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        console.log("Login submitted")
    }

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white h-full w-full">
            <div className="mx-auto grid w-full max-w-[400px] gap-6">
                <div className="grid gap-2 text-left">
                    <div className="flex items-center gap-2 mb-2 bg-gray-100 rounded-xl p-2 flex w-36">
                        <Image src="/greenfields.png" alt="" width={1920} height={1080} className="w-32 h-full" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Selamat Datang</h1>
                    <p className="text-balance text-muted-foreground text-gray-500">
                        Selamat datang kembali! Silakan masukkan detail Anda.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Masukkan email Anda"
                            required
                            className="bg-gray-50 border-gray-200"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Kata Sandi</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="bg-gray-50 border-gray-200"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 h-11 font-medium cursor-pointer shadow-lg shadow-green-700/20">
                        Masuk
                    </Button>
                    <Button variant="outline" className="w-full h-11 font-medium cursor-pointer relative" type="button">
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Masuk dengan Google
                    </Button>
                </form>
            </div>
        </div>
    )
}
