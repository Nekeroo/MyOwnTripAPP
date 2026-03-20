import React from "react";
import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import {Poi} from "@/types/poi";

type Props = {
    items: Poi[];
    onPressItem?: (item: Poi) => void;
};

export function PoiList({ items, onPressItem }: Props) {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => `${item.osm_type}-${item.id}`}
            contentContainerStyle={styles.content}
            renderItem={({ item }) => (
                <Pressable onPress={() => onPressItem?.(item)} style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.score}>Score {item.score}</Text>
                    </View>

                    <Text style={styles.meta}>
                        {item.category} / {item.subtype}
                    </Text>

                    {!!item.address && <Text style={styles.address}>{item.address}</Text>}

                    <Text style={styles.coords}>
                        {item.lat.toFixed(5)}, {item.lon.toFixed(5)}
                    </Text>
                </Pressable>
            )}
            ListEmptyComponent={
                <View style={styles.empty}>
                    <Text>Aucun point d’intérêt trouvé.</Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 12,
        paddingTop: 0,
        gap: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
    },
    score: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1f6feb",
    },
    meta: {
        marginTop: 6,
        color: "#4b5563",
    },
    address: {
        marginTop: 6,
        color: "#111827",
    },
    coords: {
        marginTop: 6,
        color: "#6b7280",
        fontSize: 12,
    },
    empty: {
        padding: 24,
        alignItems: "center",
    },
});