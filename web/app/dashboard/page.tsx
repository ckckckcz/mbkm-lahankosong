import { OverviewCards } from "@/components/dashboard/overview-cards"
import { ProductionTable } from "@/components/dashboard/production-table"
import { QualityPieChart } from "@/components/dashboard/charts/quality-pie-chart"
import { InputPieChart } from "@/components/dashboard/charts/input-pie-chart"
import { ProductionShiftChart } from "@/components/dashboard/charts/production-shift-chart"
import { ProductionGroupChart } from "@/components/dashboard/charts/production-group-chart"
import { TrendLineChart } from "@/components/dashboard/charts/temp-weight-trend-chart"

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
    return (
        <div className="space-y-6 mx-auto animate-in fade-in-50 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                    <p className="text-sm text-muted-foreground mt-1">Monitoring produksi dan kualitas real-time.</p>
                </div>
            </div>

            {/* Overview Stats */}
            <OverviewCards />

            {/* Charts Section */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                {/* Row 1 */}
                <div className="lg:col-span-2">
                    <ProductionShiftChart />
                </div>
                <div className="lg:col-span-1">
                    <QualityPieChart />
                </div>

                {/* Row 2 */}
                <div className="lg:col-span-2">
                    <ProductionGroupChart />
                </div>
                <div className="lg:col-span-1">
                    <InputPieChart />
                </div>

                {/* Row 3 - Full Width */}
                <div className="lg:col-span-3">
                    <TrendLineChart />
                </div>
            </div>

            {/* Table Section */}
            <div className="mt-6">
                <ProductionTable />
            </div>
        </div>
    )
}
