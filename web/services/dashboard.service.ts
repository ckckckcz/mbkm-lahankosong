import { Activity, Percent, Thermometer, Scale } from "lucide-react";
import {
    ProductionShiftData,
    ProductionGroupData,
    InputMethodData,
    QualityData,
    TrendData,
    ProductionItem,
    OverviewStat,
    Group,
    Shift,
    ProductionLine
} from "@/interfaces/dashboard";


const API_URL = "http://localhost:5000/api";
const BASE_URL = "http://localhost:5000";

export class DashboardService {
    static async checkConnection(): Promise<boolean> {
        try {
            const res = await fetch(`${BASE_URL}/`);
            return res.ok;
        } catch (error) {
            console.error("Connection check failed", error);
            return false;
        }
    }

    // --- Master Data: Groups ---
    static async getGroups(): Promise<Group[]> {
        const res = await fetch(`${API_URL}/groups`);
        if (!res.ok) throw new Error("Failed to fetch groups");
        return res.json();
    }

    static async createGroup(group: Partial<Group>): Promise<Group> {
        const res = await fetch(`${API_URL}/groups`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(group)
        });
        if (!res.ok) throw new Error("Failed to create group");
        return res.json();
    }

    static async updateGroup(id: number | string, group: Partial<Group>): Promise<Group> {
        const res = await fetch(`${API_URL}/groups/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(group)
        });
        if (!res.ok) throw new Error("Failed to update group");
        return res.json();
    }

    static async deleteGroup(id: number | string): Promise<void> {
        const res = await fetch(`${API_URL}/groups/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Failed to delete group");
    }

    // --- Master Data: Shifts ---
    static async getShifts(): Promise<any[]> {
        const res = await fetch(`${API_URL}/shifts`);
        if (!res.ok) throw new Error("Failed to fetch shifts");
        return res.json();
    }

    static async createShift(shift: any): Promise<any> {
        const res = await fetch(`${API_URL}/shifts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shift)
        });
        if (!res.ok) throw new Error("Failed to create shift");
        return res.json();
    }

    static async updateShift(id: number | string, shift: any): Promise<any> {
        const res = await fetch(`${API_URL}/shifts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shift)
        });
        if (!res.ok) throw new Error("Failed to update shift");
        return res.json();
    }

    static async deleteShift(id: number | string): Promise<void> {
        const res = await fetch(`${API_URL}/shifts/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Failed to delete shift");
    }

    // --- Master Data: Production Lines ---
    static async getProductionLines(): Promise<any[]> {
        const res = await fetch(`${API_URL}/production-lines`);
        if (!res.ok) throw new Error("Failed to fetch production lines");
        return res.json();
    }

    static async createProductionLine(line: any): Promise<any> {
        const res = await fetch(`${API_URL}/production-lines`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(line)
        });
        if (!res.ok) throw new Error("Failed to create production line");
        return res.json();
    }

    static async updateProductionLine(id: number | string, line: any): Promise<any> {
        const res = await fetch(`${API_URL}/production-lines/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(line)
        });
        if (!res.ok) throw new Error("Failed to update production line");
        return res.json();
    }

    static async deleteProductionLine(id: number | string): Promise<void> {
        const res = await fetch(`${API_URL}/production-lines/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Failed to delete production line");
    }

    // --- Operations ---
    static async getProductionItems(): Promise<ProductionItem[]> {
        const res = await fetch(`${API_URL}/operations`);
        if (!res.ok) throw new Error("Failed to fetch operations");
        const data = await res.json();
        // Transform data if needed to match frontend interface
        return data.map((item: any) => ({
            id: item.id,
            date: item.date,
            group: item.groups?.name || 'Unknown',
            shift: item.shifts?.name || 'Unknown',
            line: item.production_lines?.name || 'Unknown',
            group_id: item.group_id,
            shift_id: item.shift_id,
            production_line_id: item.production_line_id,
            temperature: `${item.temperature}°C`,
            weight: `${item.weight} kg`,
            temperature_val: item.temperature,
            weight_val: item.weight,
            quality: item.quality,
            inputMethod: item.input_method
        }));
    }

    static async createOperation(operation: any): Promise<any> {
        const res = await fetch(`${API_URL}/operations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(operation)
        });
        if (!res.ok) throw new Error("Failed to create operation");
        return res.json();
    }

    static async updateOperation(id: number | string, operation: any): Promise<any> {
        const res = await fetch(`${API_URL}/operations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(operation)
        });
        if (!res.ok) throw new Error("Failed to update operation");
        return res.json();
    }

    static async deleteOperation(id: number | string): Promise<void> {
        const res = await fetch(`${API_URL}/operations/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Failed to delete operation");
    }


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
