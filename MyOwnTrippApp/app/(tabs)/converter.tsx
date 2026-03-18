import { SafeAreaView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { MoneyRate, retrieveLatestRates } from "@/services/converter-service";
import { useState } from "react";

export default function TabConverterScreen() {
    const [rates, setRates] = useState<MoneyRate | null>(null);

    const handlePressConvertButton = () => {
        retrieveLatestRates()
            .then((moneyRate: MoneyRate) => setRates(moneyRate))
            .catch((err) => console.error(err));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedText>
                Fast and easy money converter
            </ThemedText>

            <TouchableOpacity onPress={handlePressConvertButton}>
                <ThemedText>Convert</ThemedText>
            </TouchableOpacity>

            <ThemedText>
                {rates ? JSON.stringify(rates, null, 2) : "No rates loaded yet"}
            </ThemedText>
        </SafeAreaView>
    );
}