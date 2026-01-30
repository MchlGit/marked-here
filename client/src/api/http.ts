const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(status: number, data: unknown) {
        super(`API Error ${status}`);
        this.status = status;
        this.data = data;
    }
}

export async function apiFetch<T>(
    path: string,
    init?: RequestInit,
): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
            "content-type": "application/json",
            ...(init?.headers || {})
        },
    });
    console.log(res);
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await res.json().catch(() => null)
        : await res.text().catch(() => null);
    if (!res.ok) throw new ApiError(res.status, data);
    return data as T;
}