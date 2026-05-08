import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Text, View } from "react-native";
import { insertExam } from "../storage/db";
import { Card, PrimaryButton, Screen, SecondaryButton } from "../ui/components";
import { theme } from "../ui/theme";
import { uuid } from "../util/uuid";

export function UploadExamScreen({ navigation }) {
  const [picked, setPicked] = useState(null);

  async function pick() {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
      multiple: false
    });

    if (res.canceled) return;
    const file = res.assets?.[0];
    if (!file) return;

    setPicked(file);
  }

  function saveMetadata() {
    if (!picked) return;

    insertExam({
      id: uuid(),
      createdAt: new Date().toISOString(),
      kind: picked.mimeType?.includes("pdf") ? "pdf" : "image",
      sourceUri: picked.uri,
      fileName: picked.name,
      status: "uploaded"
    });

    navigation.goBack();
  }

  return (
    <Screen>
      <Card
        title="Enviar exame"
        subtitle="Nesta primeira versão, vamos salvar o arquivo localmente e registrar metadados. Extração/validação vem na próxima iteração."
      >
        <PrimaryButton title="Escolher PDF ou imagem" onPress={pick} />

        {picked ? (
          <View style={{ marginTop: 12 }}>
            <Text style={{ color: theme.text, fontWeight: "700" }}>{picked.name}</Text>
            <Text style={{ color: theme.textMuted, marginTop: 4 }}>{picked.mimeType}</Text>
            <Text style={{ color: theme.textMuted, marginTop: 4 }}>{picked.size ?? "?"} bytes</Text>
          </View>
        ) : null}

        <View style={{ height: 12 }} />
        <PrimaryButton title="Salvar" onPress={saveMetadata} disabled={!picked} />
        <View style={{ height: 10 }} />
        <SecondaryButton title="Cancelar" onPress={() => navigation.goBack()} />
      </Card>
    </Screen>
  );
}

