const BASE_URL = 'https://lahankosong-backend.vercel.app/api';

class BaseApiService {
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    protected async request<T>(path: string = '', options: RequestInit = {}): Promise<T> {
        const url = `${BASE_URL}${this.endpoint}${path}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        return response.json();
    }

    async getAll<T>(): Promise<T[]> {
        return this.request<T[]>();
    }

    async getById<T>(id: string | number): Promise<T> {
        return this.request<T>(`/${id}`);
    }

    async create<T>(data: any): Promise<T> {
        return this.request<T>('', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async update<T>(id: string | number, data: any): Promise<T> {
        return this.request<T>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete(id: string | number): Promise<void> {
        return this.request<void>(`/${id}`, {
            method: 'DELETE',
        });
    }
}

class GroupService extends BaseApiService {
    constructor() {
        super('/groups');
    }
}

class ShiftService extends BaseApiService {
    constructor() {
        super('/shifts');
    }
}

class ProductionLineService extends BaseApiService {
    constructor() {
        super('/production-lines');
    }
}

class OperationService extends BaseApiService {
    constructor() {
        super('/operations');
    }
}

export const api = {
    groups: new GroupService(),
    shifts: new ShiftService(),
    productionLines: new ProductionLineService(),
    operations: new OperationService(),
};

