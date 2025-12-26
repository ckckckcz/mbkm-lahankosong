export interface Shift {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    status: 'Aktif' | 'Tidak Aktif';
    created_at?: string;
}
