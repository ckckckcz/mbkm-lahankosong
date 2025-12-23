
import { Activity, Percent, Thermometer, Scale } from "lucide-react";
import {
    ProductionShiftData,
    ProductionGroupData,
    InputMethodData,
    QualityData,
    TrendData,
    ProductionItem,
    OverviewStat
} from "@/interfaces/dashboard";

export class DashboardService {
    static getProductionShiftData(): ProductionShiftData[] {
        return [
            { name: 'Shift 1', OK: 380, NotOK: 20 },
            { name: 'Shift 2', OK: 290, NotOK: 10 },
            { name: 'Shift 3', OK: 330, NotOK: 20 },
        ];
    }

    static getProductionGroupData(): ProductionGroupData[] {
        return [
            { name: 'Group Alpha', Produksi: 250 },
            { name: 'Group Beta', Produksi: 320 },
            { name: 'Group Gamma', Produksi: 280 },
            { name: 'Group Delta', Produksi: 200 },
        ];
    }

    static getInputMethodData(): InputMethodData[] {
        return [
            { name: 'Manual', value: 300 },
            { name: 'OCR', value: 700 },
        ];
    }

    static getQualityData(): QualityData[] {
        return [
            { name: 'OK', value: 850 },
            { name: 'NOT OK', value: 150 },
        ];
    }

    static getTrendData(): TrendData[] {
        return Array.from({ length: 20 }, (_, i) => ({
            name: `${i + 1}`,
            Suhu: Math.floor(Math.random() * (90 - 80) + 80), // 80-90
            Berat: Math.floor(Math.random() * (14 - 11) + 11) + Math.random(), // 11-14
        }));
    }

    static getProductionItems(): ProductionItem[] {
        return [
            { id: 1, group: "Alpha", shift: "Shift 1", line: "Line A", temperature: "85.2°C", weight: "12.4 kg", quality: "OK", inputMethod: "OCR" },
            { id: 2, group: "Beta", shift: "Shift 2", line: "Line B", temperature: "84.8°C", weight: "12.6 kg", quality: "OK", inputMethod: "Manual" },
            { id: 3, group: "Gamma", shift: "Shift 1", line: "Line A", temperature: "86.1°C", weight: "12.3 kg", quality: "NOT OK", inputMethod: "OCR" },
            { id: 4, group: "Alpha", shift: "Shift 3", line: "Line C", temperature: "83.5°C", weight: "12.5 kg", quality: "OK", inputMethod: "OCR" },
            { id: 5, group: "Delta", shift: "Shift 2", line: "Line B", temperature: "85.0°C", weight: "12.2 kg", quality: "OK", inputMethod: "Manual" },
            { id: 6, group: "Beta", shift: "Shift 1", line: "Line A", temperature: "87.2°C", weight: "11.8 kg", quality: "NOT OK", inputMethod: "OCR" },
            { id: 7, group: "Alpha", shift: "Shift 2", line: "Line C", temperature: "84.5°C", weight: "12.5 kg", quality: "OK", inputMethod: "OCR" },
            { id: 8, group: "Gamma", shift: "Shift 3", line: "Line B", temperature: "85.4°C", weight: "12.7 kg", quality: "OK", inputMethod: "Manual" },
            { id: 9, group: "Delta", shift: "Shift 1", line: "Line A", temperature: "83.9°C", weight: "12.4 kg", quality: "OK", inputMethod: "OCR" },
            { id: 10, group: "Beta", shift: "Shift 2", line: "Line C", temperature: "86.0°C", weight: "12.1 kg", quality: "OK", inputMethod: "OCR" },
        ];
    }

    static getOverviewStats(): OverviewStat[] {
        return [
            {
                title: "Total Produksi",
                value: "12",
                change: "+17%",
                positive: true,
                icon: Activity,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-100"
            },
            {
                title: "Quality Rate",
                value: "75%",
                change: "+32%",
                positive: true,
                icon: Percent,
                color: "text-emerald-600",
                bgColor: "bg-emerald-50",
                borderColor: "border-emerald-100"
            },
            {
                title: "Rata-rata Suhu",
                value: "84.4 °C",
                change: "-17%",
                positive: false,
                icon: Thermometer,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-100"
            },
            {
                title: "Rata-rata Berat",
                value: "12.5 kg",
                change: "+17%",
                positive: true,
                icon: Scale,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-100"
            }
        ];
    }
}
