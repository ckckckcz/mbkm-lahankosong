"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomTooltip } from "../custom-tooltip";
import { DashboardService } from "@/services/dashboard.service";
import { ProductionGroupData } from "@/interfaces/dashboard";

export function ProductionGroupChart() {
    const data: ProductionGroupData[] = DashboardService.getProductionGroupData();

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Produksi Per Group</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{
                                top: 5,
                                right: 30,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                            <XAxis
                                type="number"
                                tick={{ fontSize: 12, fill: "#6B7280" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
                                tick={{ fontSize: 12, fill: "#6B7280" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6', opacity: 0.5 }} />
                            <Bar
                                dataKey="Produksi"
                                fill="#22c55e"
                                radius={[0, 4, 4, 0]}
                                barSize={24}
                                activeBar={{ fill: '#16a34a' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
