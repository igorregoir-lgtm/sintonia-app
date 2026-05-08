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

export default function App() {
  const boot = useBootstrap();

  if (boot.status === "loading") return null;
  if (boot.status === "error") return null;

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
