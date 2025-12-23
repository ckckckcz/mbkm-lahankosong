"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomTooltip } from "../custom-tooltip";
import { DashboardService } from "@/services/dashboard.service";
import { ProductionShiftData } from "@/interfaces/dashboard";

export function ProductionShiftChart() {
    const data: ProductionShiftData[] = DashboardService.getProductionShiftData();

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Produksi Per Shift (OK vs NOT OK)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 0,
                                bottom: 0,
                            }}
                            barGap={8}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: "#6B7280" }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: "#6B7280" }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ top: -10, right: 0 }}
                            />
                            <Bar
                                dataKey="OK"
                                name="OK"
                                fill="#22c55e"
                                radius={[4, 4, 4, 4]}
                                barSize={40}
                            />
                            <Bar
                                dataKey="NotOK"
                                name="NOT OK"
                                fill="#ef4444"
                                radius={[4, 4, 4, 4]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
