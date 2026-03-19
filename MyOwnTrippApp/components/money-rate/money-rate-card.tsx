import { MoneyRate } from "@/services/converter-service";
import { useMemo, useState } from "react";
import { FlatList, ListRenderItem, View, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "../themed-text";
import { SafeAreaView } from "react-native-safe-area-context";

type RateItem = {
  currency: string;
  value: number;
}

type Props = {
  data: MoneyRate;
}

export function MoneyRateCard({ data }: Props) {

  const formattedDate = useMemo(() => {
    const dateObj = new Date(data.date);

    if (isNaN(dateObj.getTime())) {
      return 'Date invalide';
    }

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(dateObj);
  }, [data.date]);

  const rateList = useMemo<RateItem[]>(() => {
    return Object.entries(data.rates)
      .map(([currency, value]) => ({ currency, value }))
      .sort((a, b) => a.currency.localeCompare(b.currency));
  }, [data.rates]);

  const renderItem: ListRenderItem<RateItem> = ({ item }) => (
    <View style={styles.row}>
      <ThemedText style={styles.currency}>{item.currency}</ThemedText>
      <ThemedText style={styles.value}>{item.value.toFixed(4)}</ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.card}>
      <ThemedText style={styles.title}>Taux de change</ThemedText>

      <View style={styles.header}>
        <View>
          <ThemedText style={styles.label}>Devise de base</ThemedText>
          <ThemedText style={styles.base}>{data.base}</ThemedText>
        </View>

        <View>
          <ThemedText style={styles.label}>Date</ThemedText>
          <ThemedText style={styles.date}>{formattedDate}</ThemedText>
        </View>
      </View>

      <FlatList
        data={rateList}
        keyExtractor={(item) => item.currency}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  base: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  date: {
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    paddingTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  value: {
    fontSize: 16,
    color: '#2563eb',
    fontVariant: ['tabular-nums'],
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
});