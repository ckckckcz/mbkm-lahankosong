"use client"
import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomTooltip } from "../custom-tooltip";
import { DashboardService } from '@/services/dashboard.service';
import { TrendData } from '@/interfaces/dashboard';

export function TrendLineChart() {
    const [data, setData] = useState<TrendData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await DashboardService.getTrendData();
                setData(res);
            } catch (error) {
                console.error("Failed to fetch trend data", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) return <Card className="h-[300px] flex items-center justify-center"><div className="animate-pulse bg-gray-200 h-32 w-full rounded-xl m-6"></div></Card>;

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Tren Suhu & Berat (20 Operasi Terakhir)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorSuhu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorBerat" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: "#6B7280" }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                stroke="#ef4444"
                                domain={[70, 100]}
                                tick={{ fontSize: 12, fill: "#ef4444" }}
                                axisLine={false}
                                tickLine={false}
                                width={40}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#22c55e"
                                domain={[10, 15]}
                                tick={{ fontSize: 12, fill: "#22c55e" }}
                                axisLine={false}
                                tickLine={false}
                                width={40}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ top: -10, right: 0 }}
                            />
                            <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="Suhu"
                                stroke="#ef4444"
                                fillOpacity={1}
                                fill="url(#colorSuhu)"
                                strokeWidth={2}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="Berat"
                                stroke="#22c55e"
                                fillOpacity={1}
                                fill="url(#colorBerat)"
                                strokeWidth={2}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
