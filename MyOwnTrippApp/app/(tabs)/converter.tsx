import { SafeAreaView, TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { MoneyRate, retrieveLatestRates } from "@/services/converter-service";
import { useState } from "react";
import { MoneyRateCard } from "@/components/money-rate/money-rate-card";

export default function TabConverterScreen() {
  const [rates, setRates] = useState<MoneyRate | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePressConvertButton = async () => {
    try {
      setLoading(true);
      const moneyRate = await retrieveLatestRates();
      setRates(moneyRate);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          💱 Convertisseur
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Taux de change en temps réel
        </ThemedText>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePressConvertButton}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Chargement..." : "Actualiser les taux"}
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.content}>
        {rates ? (
          <MoneyRateCard data={rates} />
        ) : (
          <ThemedText style={styles.placeholder}>
            Appuie sur le bouton pour récupérer les taux 💡
          </ThemedText>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  header: {
    marginBottom: 24,
    gap: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  placeholder: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280",
  },
});