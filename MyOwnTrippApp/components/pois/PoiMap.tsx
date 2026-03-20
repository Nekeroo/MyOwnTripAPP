import React, { useMemo } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import {Poi} from "@/types/poi";

type Props = {
    items: Poi[];
    selectedPoiId?: number | null;
    onPressMarker?: (item: Poi) => void;
};

function buildRegion(items: Poi[]): Region {
    if (items.length === 0) {
        return {
            latitude: 48.8566,
            longitude: 2.3522,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
        };
    }

    const first = items[0];
    const lats = items.map((i) => i.lat);
    const lons = items.map((i) => i.lon);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    return {
        latitude: first.lat,
        longitude: first.lon,
        latitudeDelta: Math.max(0.05, (maxLat - minLat) * 1.4),
        longitudeDelta: Math.max(0.05, (maxLon - minLon) * 1.4),
    };
}

export default function PoiMap({ items, selectedPoiId, onPressMarker }: Props) {
    const region = useMemo(() => buildRegion(items), [items]);

    if (items.length === 0) {
        return (
            <View style={styles.empty}>
                <Text>Aucun point à afficher sur la carte.</Text>
            </View>
        );
    }

    return (
        <MapView style={styles.map} initialRegion={region}>
            {items.map((item) => (
                <Marker
                    key={`${item.osm_type}-${item.id}`}
                    coordinate={{ latitude: item.lat, longitude: item.lon }}
                    title={item.name}
                    description={`${item.category} / ${item.subtype}`}
                    pinColor={selectedPoiId === item.id ? "blue" : undefined}
                    onPress={() => onPressMarker?.(item)}
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: { flex: 1 },
    empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});