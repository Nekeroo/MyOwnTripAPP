export type Poi = {
    id: number;
    osm_type: string;
    name: string;
    category: string;
    subtype: string;
    lat: number;
    lon: number;
    address?: string;
    score: number;
};

export type PoiApiResponse = {
    count: number;
    items: Poi[];
};