import React, {useMemo, useState} from "react";
import {View, Text, StyleSheet, Pressable, ActivityIndicator, Platform} from "react-native";
import {Poi} from "@/types/poi";
import {SearchBar} from "@/components/pois/SearchBar";
import {PoiList} from "@/components/pois/PoiList";
import {fetchPoisByCity} from "@/services/poiApî";
import PoiMap from "@/components/pois/PoiMap";
type ViewMode = "list" | "map";

export default function PoisSearchScreen() {
    const [city, setCity] = useState("");
    const [items, setItems] = useState<Poi[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

    const title = useMemo(() => {
        if (!city.trim()) return "Points d’intérêt";
        return `Résultats pour ${city.trim()}`;
    }, [city]);

    const handleSearch = async () => {
        if (!city.trim()) return;

        try {
            setLoading(true);
            setError(null);
            setSelectedPoi(null);

            const data = await fetchPoisByCity(city.trim(), "fr", 50);
            setItems(data.items);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Erreur inconnue";
            setError(message);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <SearchBar
                value={city}
                onChange={setCity}
                onSubmit={handleSearch}
                loading={loading}
            />

            <View style={styles.toolbar}>
                <Pressable
                    style={[styles.tab, viewMode === "list" && styles.tabActive]}
                    onPress={() => setViewMode("list")}
                >
                    <Text style={[styles.tabText, viewMode === "list" && styles.tabTextActive]}>
                        Liste
                    </Text>
                </Pressable>

                <Pressable
                    style={[styles.tab, viewMode === "map" && styles.tabActive]}
                    onPress={() => setViewMode("map")}
                >
                    <Text style={[styles.tabText, viewMode === "map" && styles.tabTextActive]}>
                        Carte
                    </Text>
                </Pressable>
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large"/>
                    <Text style={styles.helper}>Recherche en cours…</Text>
                </View>
            ) : error ? (
                <View style={styles.center}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            ) : viewMode === "list" ? (
                <PoiList items={items} onPressItem={(item) => setSelectedPoi(item)}/>
            ) : (
                <PoiMap
                    items={items}
                    selectedPoiId={selectedPoi?.id ?? null}
                    onPressMarker={(item: Poi) => setSelectedPoi(item)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
        paddingTop: 52,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        paddingHorizontal: 12,
        paddingBottom: 4,
    },
    toolbar: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingBottom: 10,
        gap: 8,
    },
    tab: {
        backgroundColor: "#e5e7eb",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },
    tabActive: {
        backgroundColor: "#111827",
    },
    tabText: {
        color: "#111827",
        fontWeight: "600",
    },
    tabTextActive: {
        color: "#fff",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    helper: {
        marginTop: 12,
        color: "#4b5563",
    },
    error: {
        color: "#b91c1c",
        textAlign: "center",
    },
});