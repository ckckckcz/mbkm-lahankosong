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


    // --- Dynamic Chart Data ---
    static async getProductionShiftData(): Promise<ProductionShiftData[]> {
        const items = await this.getProductionItems();
        const shiftMap = new Map<string, { OK: number, NotOK: number }>();

        items.forEach(item => {
            const shiftName = item.shift;
            if (!shiftMap.has(shiftName)) {
                shiftMap.set(shiftName, { OK: 0, NotOK: 0 });
            }
            const current = shiftMap.get(shiftName)!;
            if (item.quality === 'OK') current.OK++;
            else current.NotOK++;
        });

        return Array.from(shiftMap.entries()).map(([name, data]) => ({
            name,
            OK: data.OK,
            NotOK: data.NotOK
        }));
    }

    static async getProductionGroupData(): Promise<ProductionGroupData[]> {
        const items = await this.getProductionItems();
        const groupMap = new Map<string, number>();

        items.forEach(item => {
            const groupName = item.group;
            groupMap.set(groupName, (groupMap.get(groupName) || 0) + 1);
        });

        return Array.from(groupMap.entries()).map(([name, count]) => ({
            name,
            Produksi: count
        }));
    }

    static async getInputMethodData(): Promise<InputMethodData[]> {
        const items = await this.getProductionItems();
        const methodMap = new Map<string, number>();

        items.forEach(item => {
            const method = item.inputMethod;
            methodMap.set(method, (methodMap.get(method) || 0) + 1);
        });

        return Array.from(methodMap.entries()).map(([name, value]) => ({
            name,
            value
        }));
    }

    static async getQualityData(): Promise<QualityData[]> {
        const items = await this.getProductionItems();
        const qualityMap = new Map<string, number>();

        items.forEach(item => {
            const quality = item.quality;
            qualityMap.set(quality, (qualityMap.get(quality) || 0) + 1);
        });

        return Array.from(qualityMap.entries()).map(([name, value]) => ({
            name,
            value
        }));
    }

    static async getTrendData(): Promise<TrendData[]> {
        const items = await this.getProductionItems();
        // Sort by date ascending
        const sorted = [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-20); // Last 20 items

        return sorted.map((item, index) => ({
            name: `${index + 1}`,
            Suhu: item.temperature_val || 0,
            Berat: item.weight_val || 0
        }));
    }

    static async getOverviewStats(): Promise<OverviewStat[]> {
        const items = await this.getProductionItems();
        if (items.length === 0) return this.getDefaultStats();

        const totalProduksi = items.length;
        const totalOK = items.filter(i => i.quality === 'OK').length;
        const qualityRate = totalProduksi > 0 ? ((totalOK / totalProduksi) * 100).toFixed(1) : 0;

        const totalTemp = items.reduce((sum, i) => sum + (Number(i.temperature_val) || 0), 0);
        const avgTemp = totalProduksi > 0 ? (totalTemp / totalProduksi).toFixed(1) : 0;

        const totalWeight = items.reduce((sum, i) => sum + (Number(i.weight_val) || 0), 0);
        const avgWeight = totalProduksi > 0 ? (totalWeight / totalProduksi).toFixed(1) : 0;

        return [
            {
                title: "Total Produksi",
                value: totalProduksi.toString(),
                change: "+0%", 
                positive: true,
                icon: Activity,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-100"
            },
            {
                title: "Quality Rate",
                value: `${qualityRate}%`,
                change: "+0%",
                positive: true,
                icon: Percent,
                color: "text-emerald-600",
                bgColor: "bg-emerald-50",
                borderColor: "border-emerald-100"
            },
            {
                title: "Rata-rata Suhu",
                value: `${avgTemp} °C`,
                change: "+0%",
                positive: false,
                icon: Thermometer,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-100"
            },
            {
                title: "Rata-rata Berat",
                value: `${avgWeight} kg`,
                change: "+0%",
                positive: true,
                icon: Scale,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-100"
            }
        ];
    }

    private static getDefaultStats(): OverviewStat[] {
        return [
            {
                title: "Total Produksi",
                value: "0",
                change: "0%",
                positive: true,
                icon: Activity,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-100"
            },
            {
                title: "Quality Rate",
                value: "0%",
                change: "0%",
                positive: true,
                icon: Percent,
                color: "text-emerald-600",
                bgColor: "bg-emerald-50",
                borderColor: "border-emerald-100"
            },
            {
                title: "Rata-rata Suhu",
                value: "0 °C",
                change: "0%",
                positive: false,
                icon: Thermometer,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-100"
            },
            {
                title: "Rata-rata Berat",
                value: "0 kg",
                change: "0%",
                positive: true,
                icon: Scale,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-100"
            }
        ];
    }
}
