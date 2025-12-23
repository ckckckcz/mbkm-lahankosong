
import { LucideIcon } from "lucide-react";

// --- Chart Data Interfaces ---

export interface ProductionShiftData {
    name: string;
    OK: number;
    NotOK: number;
    [key: string]: any;
}

export interface ProductionGroupData {
    name: string;
    Produksi: number;
    [key: string]: any;
}

export interface InputMethodData {
    name: string;
    value: number;
    [key: string]: any;
}

export interface QualityData {
    name: string;
    value: number;
    [key: string]: any;
}

export interface TrendData {
    name: string;
    Suhu: number;
    Berat: number;
    [key: string]: any;
}

// --- Table Data Interfaces ---

export interface ProductionItem {
    id: number;
    group: string;
    shift: string;
    line: string;
    temperature: string;
    weight: string;
    quality: "OK" | "NOT OK";
    inputMethod: "OCR" | "Manual";
}

// --- Component Props & UI Interfaces ---

export interface OverviewStat {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    borderColor: string;
}

export interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    hideLabel?: boolean;
}

export interface SidebarProps {
    className?: string;
}

// --- Master Data Interfaces ---

export interface Group {
    id: number;
    name: string;
    status: 'Aktif' | 'Nonaktif';
}

export interface Shift {
    id: number;
    name: string;
    startTime: string; // "08:00"
    endTime: string;   // "16:00"
    status: 'Aktif' | 'Nonaktif';
}

export interface ProductionLine {
    id: number;
    name: string;
    status: 'Aktif' | 'Nonaktif';
}
