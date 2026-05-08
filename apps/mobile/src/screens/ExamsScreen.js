import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { listExams } from "../storage/db";
import { Card, PrimaryButton, Screen } from "../ui/components";
import { theme } from "../ui/theme";

export function ExamsScreen({ navigation }) {
  const [exams, setExams] = useState([]);

  const refresh = useCallback(() => {
    setExams(listExams(50));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <Screen>
      <Card title="Exames" subtitle="No MVP: PDF e imagem. Extração sempre com validação humana.">
        <PrimaryButton title="Enviar exame" onPress={() => navigation.navigate("UploadExam")} />
      </Card>

      <Card title="Histórico" subtitle={exams.length ? "Mais recente primeiro." : "Nenhum exame ainda."}>
        {exams.map((e) => (
          <View key={e.id} style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <Text style={{ color: theme.text, fontWeight: "700" }}>{e.file_name ?? e.kind}</Text>
            <Text style={{ color: theme.textMuted, marginTop: 4 }}>
              {new Date(e.created_at).toLocaleString()} · {e.status}
            </Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

