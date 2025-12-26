"use client"
import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomTooltip } from "../custom-tooltip";
import { DashboardService } from "@/services/dashboard.service";
import { InputMethodData } from "@/interfaces/dashboard";

const COLORS = ['#94a3b8', '#3b82f6'];

export function InputPieChart() {
    const [data, setData] = useState<InputMethodData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await DashboardService.getInputMethodData();
                setData(res);
            } catch (error) {
                console.error("Failed to fetch input method data", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) return <Card className="h-[300px] flex items-center justify-center"><div className="animate-pulse bg-gray-200 h-32 w-32 rounded-full"></div></Card>;

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Metode Input</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                stroke="#fff"
                                strokeWidth={2}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip hideLabel />} />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value) => <span className="text-sm text-gray-600 font-medium ml-1">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
