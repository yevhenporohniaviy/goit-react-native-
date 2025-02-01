import { useState } from "react";
import { useFonts } from "expo-font";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function App() {
  const [isLoginScreen, setIsLoginScreen] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={style.section}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoginScreen ? (
    <LoginScreen onRegister={() => setIsLoginScreen(false)} />
  ) : (
    <RegistrationScreen onHasAccount={() => setIsLoginScreen(true)} />
  );
}

const style = StyleSheet.create({
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
