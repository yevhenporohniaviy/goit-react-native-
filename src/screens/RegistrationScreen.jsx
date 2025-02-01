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
import { CirclePlusSvg } from "../../assets/icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState({
    login: "",
    email: "",
    password: "",
    photo: "",
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handlePhotoUpload = useCallback(async () => {
    console.log("Upload photo");
  }, []);

  const handleLoginChange = useCallback((value) => {
    setState((prev) => ({ ...prev, login: value }));
  }, []);

  const handleEmailChange = useCallback((value) => {
    setState((prev) => ({ ...prev, email: value }));
  }, []);

  const handlePasswordChange = useCallback((value) => {
    if (value.length <= 20) {
      setState((prev) => ({ ...prev, password: value }));
    }
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordHidden((prev) => !prev);
  }, []);

  const onRegister = useCallback(async () => {
    console.log("register");
    console.log(state);
  }, [state]);

  const onSignUp = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  const passwordToggleButton = (
    <TouchableOpacity onPress={togglePasswordVisibility}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        {isPasswordHidden ? "Показати" : "Сховати"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
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
          <View style={styles.photoContainer}>
            <Pressable onPress={handlePhotoUpload} style={styles.circlePlus}>
              <CirclePlusSvg />
            </Pressable>
          </View>

          <Text style={styles.title}>Реєстрація</Text>

          <View style={[styles.innerContainer, styles.inputContainer]}>
            <Input
              value={state.login}
              autoFocus={true}
              placeholder="Логін"
              onTextChange={handleLoginChange}
            />

            <Input
              value={state.email}
              placeholder="Адреса електронної пошти"
              onTextChange={handleEmailChange}
            />

            <Input
              value={state.password}
              placeholder="Пароль"
              rightButton={passwordToggleButton}
              outerStyles={styles.passwordButton}
              onTextChange={handlePasswordChange}
              secureTextEntry={isPasswordHidden}
            />
          </View>

          <View style={[styles.innerContainer, styles.buttonContainer]}>
            <Button onPress={onRegister}>
              <Text style={[styles.baseText, styles.loginButtonText]}>
                Зареєструватися
              </Text>
            </Button>

            <View style={styles.signUpContainer}>
              <Text style={[styles.baseText, styles.passwordButtonText]}>
                Вже є акаунт?{" "}
              </Text>
              <TouchableOpacity onPress={onSignUp}>
                <Text style={[styles.baseText, styles.signUpText]}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default RegistrationScreen;

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
    height: "67.61%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
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
  photoContainer: {
    position: "absolute",
    top: -60,
    height: 120,
    width: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    alignSelf: "center",
  },
  circlePlus: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
    height: 25,
    width: 25,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});
