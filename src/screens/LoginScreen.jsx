import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { colors } from "../../styles/global";

import Input from "../components/Input";
import Button from "../components/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const LoginScreen = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleEmailChange = useCallback((value) => {
    setEmail(value);
  }, []);

  const handlePasswordChange = useCallback((value) => {
    if (value.length < 20) {
      setPassword(value);
    }
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordHidden((prev) => !prev);
  }, []);

  const onLogin = useCallback(async () => {
    console.log("login");
    console.log(email, password);
  }, [email, password]);

  const onSignUp = useCallback(() => {
    onRegister();
  }, [onRegister]);

  const passwordToggleButton = (
    <TouchableOpacity onPress={togglePasswordVisibility}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        {isPasswordHidden ? "Показати" : "Сховати"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <Image
        source={require("../../assets/images/bg_native.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Увійти</Text>

          <View style={[styles.innerContainer, styles.inputContainer]}>
            <Input
              value={email}
              autoFocus={true}
              placeholder="Адреса електронної пошти"
              onTextChange={handleEmailChange}
            />

            <Input
              value={password}
              placeholder="Пароль"
              rightButton={passwordToggleButton}
              outerStyles={styles.passwordButton}
              onTextChange={handlePasswordChange}
              secureTextEntry={isPasswordHidden}
            />
          </View>

          <View style={[styles.innerContainer, styles.buttonContainer]}>
            <Button onPress={onLogin}>
              <Text style={[styles.baseText, styles.loginButtonText]}>
                Увійти
              </Text>
            </Button>

            <View style={styles.signUpContainer}>
              <Text style={[styles.baseText, styles.infoText]}>
                Немає акаунту?
              </Text>
              <TouchableOpacity onPress={onSignUp}>
                <Text style={[styles.baseText, styles.signUpText]}>
                  {" Зареєструватися"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "55%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
    color: colors.blue,
  },
  infoText: {
    color: colors.blue,
  },
});
