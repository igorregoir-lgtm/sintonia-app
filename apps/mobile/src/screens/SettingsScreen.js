import { Text } from "react-native";
import { Card, Screen } from "../ui/components";
import { theme } from "../ui/theme";

export function SettingsScreen() {
  return (
    <Screen>
      <Card title="Privacidade" subtitle="Por design, dados clínicos detalhados ficam no seu dispositivo.">
        <Text style={{ color: theme.textMuted, lineHeight: 20 }}>
          No MVP, o app não sincroniza seu dossiê automaticamente. Para compartilhar com médicos, use exportação de
          relatório (ou link temporário quando habilitado).
        </Text>
      </Card>
    </Screen>
  );
}

