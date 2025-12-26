export interface Operation {
    id: number;
    date: string;
    group_id: number;
    shift_id: number;
    production_line_id: number;
    temperature: number;
    weight: number;
    quality: 'OK' | 'NOT OK';
    input_method: 'Manual' | 'OCR';
    created_at?: string;
    // Joined fields
    groups?: { name: string };
    shifts?: { name: string };
    production_lines?: { name: string };
}
