export interface ProductionLine {
    id: number;
    name: string;
    status: 'Aktif' | 'Tidak Aktif';
    created_at?: string;
}
