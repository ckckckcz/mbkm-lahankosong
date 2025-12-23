"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DashboardService } from "@/services/dashboard.service"
import { OverviewStat } from "@/interfaces/dashboard"

export function OverviewCards() {
    const stats: OverviewStat[] = DashboardService.getOverviewStats();

    return (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className={cn(
                        "overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border",
                        stat.borderColor
                    )}
                >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-md font-semibold text-muted-foreground">{stat.title}</p>
                            <div className={cn("p-2 rounded-full", stat.bgColor)}>
                                <stat.icon className={cn("h-5 w-5", stat.color)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <h3 className="text-3xl font-bold tracking-tight mb-2">{stat.value}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <span className={cn(
                                    "flex items-center font-semibold px-1.5 py-0.5 rounded-full mr-2",
                                    stat.positive
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                )}>
                                    {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                                    {stat.change}
                                </span>
                                <span>vs bulan lalu</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
