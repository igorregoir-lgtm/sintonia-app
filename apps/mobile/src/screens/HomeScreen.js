import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { listRecentCheckIns } from "../storage/db";
import { Card, PrimaryButton, Screen, SecondaryButton } from "../ui/components";
import { theme } from "../ui/theme";

export function HomeScreen({ navigation }) {
  const [checkIns, setCheckIns] = useState([]);

  const refresh = useCallback(() => {
    const rows = listRecentCheckIns(7);
    setCheckIns(rows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const summary = useMemo(() => {
    if (checkIns.length === 0) return null;
    const avg = (key) => {
      const nums = checkIns.map((c) => c[key]).filter((n) => typeof n === "number");
      if (nums.length === 0) return null;
      return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 10) / 10;
    };
    return {
      mood: avg("mood"),
      energy: avg("energy"),
      sleep: avg("sleep_quality")
    };
  }, [checkIns]);

  return (
    <Screen>
      <Card
        title="Check-in de hoje"
        subtitle="30 segundos. Sem fricção. Seus dados ficam no seu dispositivo."
        right={<Text style={{ color: theme.gold, fontWeight: "700" }}>{checkIns.length}/7</Text>}
      >
        <PrimaryButton title="Fazer check-in" onPress={() => navigation.navigate("CheckIn")} />
        <View style={{ height: 10 }} />
        <SecondaryButton title="Exames" onPress={() => navigation.navigate("Exams")} />
      </Card>

      <Card title="Resumo (últimos 7 dias)" subtitle="Tendências simples para você e para levar à consulta.">
        {summary ? (
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Metric label="Humor" value={summary.mood ?? "—"} />
            <Metric label="Energia" value={summary.energy ?? "—"} />
            <Metric label="Sono" value={summary.sleep ?? "—"} />
          </View>
        ) : (
          <Text style={{ color: theme.textMuted }}>Sem check-ins ainda.</Text>
        )}
      </Card>

      <Card title="Relatório" subtitle="Preparação para consulta (hipóteses, não diagnóstico).">
        <PrimaryButton title="Ver relatório (rascunho)" onPress={() => navigation.navigate("Report")} />
        <View style={{ height: 10 }} />
        <SecondaryButton title="Configurações" onPress={() => navigation.navigate("Settings")} />
      </Card>
    </Screen>
  );
}

function Metric({ label, value }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: theme.textMuted, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: theme.text, fontSize: 20, fontWeight: "700", marginTop: 4 }}>{value}</Text>
    </View>
  );
}

