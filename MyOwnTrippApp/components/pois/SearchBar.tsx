import React from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

type Props = {
    value: string;
    loading?: boolean;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

export function SearchBar({ value, loading = false, onChange, onSubmit }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Rechercher une ville..."
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="search"
                onSubmitEditing={onSubmit}
            />

            <Pressable
                onPress={onSubmit}
                disabled={loading || !value.trim()}
                style={[styles.button, (loading || !value.trim()) && styles.buttonDisabled]}
            >
                <Text style={styles.buttonText}>{loading ? "Chargement..." : "Chercher"}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
        padding: 12,
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d0d7de",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: "#1f6feb",
        paddingHorizontal: 14,
        justifyContent: "center",
        borderRadius: 10,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});