import { PoiApiResponse } from "@/types/poi";

const API_BASE_URL = "http://192.168.1.158:3000";

export async function fetchPoisByCity(city: string, countryCode = "fr", limit = 50): Promise<PoiApiResponse> {
    const params = new URLSearchParams({
        city,
        countryCode,
        limit: String(limit),
    });

    const response = await fetch(`${API_BASE_URL}/pois?${params.toString()}`);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erreur lors de la récupération des POI");
    }

    return response.json();
}