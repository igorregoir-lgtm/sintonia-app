import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./src/screens/HomeScreen";
import { CheckInScreen } from "./src/screens/CheckInScreen";
import { ExamsScreen } from "./src/screens/ExamsScreen";
import { UploadExamScreen } from "./src/screens/UploadExamScreen";
import { ReportScreen } from "./src/screens/ReportScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { useBootstrap } from "./src/state/bootstrap";
import { Screen } from "./src/ui/components";
import { theme } from "./src/ui/theme";
import { Text } from "react-native";

export default function App() {
  const boot = useBootstrap();

  if (boot.status === "loading")
    return (
      <Screen>
        <Text style={{ color: theme.textMuted }}>Carregando…</Text>
      </Screen>
    );
  if (boot.status === "error")
    return (
      <Screen>
        <Text style={{ color: theme.textMuted }}>
          Erro ao iniciar o app. Veja o log do Metro.
        </Text>
        {boot.error ? (
          <Text style={{ color: theme.text, marginTop: 12, fontSize: 12 }}>
            {String(boot.error?.message ?? boot.error)}
          </Text>
        ) : null}
      </Screen>
    );

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Sintonia" }} />
        <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: "Check-in" }} />
        <Stack.Screen name="Exams" component={ExamsScreen} options={{ title: "Exames" }} />
        <Stack.Screen name="UploadExam" component={UploadExamScreen} options={{ title: "Enviar exame" }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ title: "Relatório" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Configurações" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
