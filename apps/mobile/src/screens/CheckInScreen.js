import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { insertCheckIn } from "../storage/db";
import { Card, PrimaryButton, Screen } from "../ui/components";
import { theme } from "../ui/theme";
import { uuid } from "../util/uuid";

export function CheckInScreen({ navigation }) {
  const [mood, setMood] = useState("3");
  const [energy, setEnergy] = useState("3");
  const [sleepQuality, setSleepQuality] = useState("3");
  const [notes, setNotes] = useState("");

  function save() {
    const id = uuid();
    insertCheckIn({
      id,
      createdAt: new Date().toISOString(),
      mood: clampInt(mood),
      energy: clampInt(energy),
      sleepQuality: clampInt(sleepQuality),
      notes: notes.trim() ? notes.trim() : null
    });
    navigation.goBack();
  }

  return (
    <Screen>
      <Card
        title="Check-in rápido"
        subtitle="Escalas simples (1–5). Você pode ajustar depois. Evite transformar isso em obrigação."
      >
        <Field label="Humor (1–5)" value={mood} onChangeText={setMood} />
        <Field label="Energia (1–5)" value={energy} onChangeText={setEnergy} />
        <Field label="Sono (1–5)" value={sleepQuality} onChangeText={setSleepQuality} />

        <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 12 }}>Notas (opcional)</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Algo relevante hoje?"
          placeholderTextColor="rgba(248,245,240,0.35)"
          style={{
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 10,
            color: theme.text,
            padding: 12,
            marginTop: 8,
            minHeight: 90
          }}
          multiline
        />

        <View style={{ height: 12 }} />
        <PrimaryButton title="Salvar" onPress={save} />
      </Card>
    </Screen>
  );
}

function Field({ label, value, onChangeText }) {
  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ color: theme.textMuted, fontSize: 12 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 10,
          color: theme.text,
          padding: 12,
          marginTop: 8
        }}
      />
    </View>
  );
}

function clampInt(s) {
  const n = Number.parseInt(String(s), 10);
  if (!Number.isFinite(n)) return null;
  return Math.max(1, Math.min(5, n));
}

