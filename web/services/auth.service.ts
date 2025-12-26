const API_URL = "http://localhost:7860/api/auth";

export class AuthService {
    static async login(email: string, password: string): Promise<any> {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Login failed");
        }

        return data;
    }

    static async register(name: string, email: string, password: string): Promise<any> {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Registration failed");
        }

        return data;
    }

    static logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    static isAuthenticated(): boolean {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    }

    static getUser(): any {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            if (userStr) return JSON.parse(userStr);
        }
        return null;
    }
}
