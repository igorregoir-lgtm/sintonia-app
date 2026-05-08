import { Text, View } from "react-native";
import { Card, PrimaryButton, Screen } from "../ui/components";
import { theme } from "../ui/theme";

export function ReportScreen() {
  return (
    <Screen>
      <Card title="Relatório (rascunho)" subtitle="Preparação para consulta. Hipóteses, não diagnóstico.">
        <Text style={{ color: theme.textMuted, lineHeight: 20 }}>
          Nesta iteração inicial, o relatório será composto a partir de: check-ins, escalas e exames. A etapa de
          auditoria multidisciplinar e a exportação (PDF/DOCX) entram nas próximas iterações.
        </Text>

        <View style={{ height: 12 }} />
        <PrimaryButton title="Gerar (placeholder)" onPress={() => {}} disabled />
      </Card>
    </Screen>
  );
}

