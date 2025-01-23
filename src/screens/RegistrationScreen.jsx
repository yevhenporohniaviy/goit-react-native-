import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import CirclePlusSvg from "../../assets/icons/CirclePlusSvg";
import { Input, Button } from "../components";
import { colors } from "../../styles/global";
import { useState } from "react";

export default function Index() {
  const [state] = useState({
    login: "",
    email: "",
    password: "",
  });
  const handlePhotoUpload = () => {
    console.log("Photo upload");
  };

  const showButton = (
    <TouchableWithoutFeedback>
      <Text style={[register.baseText, register.passwordButtonText]}>
        Показати
      </Text>
    </TouchableWithoutFeedback>
  );

  return (
    <ImageBackground
      style={register.imageBg}
      source={require("../../assets/images/bg_native.png")}
      resizeMode="cover"
    >
      <View style={register.wrapper}>
        <View style={register.registerBoard}>
          <Pressable onPress={handlePhotoUpload} style={register.uploader}>
            <View style={register.circlePlus}>
              <CirclePlusSvg />
            </View>
          </Pressable>
          <Text style={register.title}>Реєстрація</Text>
          <View style={register.inputsWrap}>
            <Input value={state.login} autofocus={true} placeholder="Логін" />
            <Input
              value={state.email}
              autofocus={true}
              placeholder="Адреса електронної пошти"
            />
            <Input
              value={state.password}
              placeholder="Пароль"
              outerStyles={register.passwordButton}
              rightButton={showButton}
            />
          </View>
          <View style={register.buttonWrap}>
            <Button>
              <Text style={[register.baseText, register.loginButtonText]}>
                Зареєструватися
              </Text>
            </Button>
            <View style={register.signUpContainer}>
              <Text style={[register.baseText, register.passwordButtonText]}>
                Вже є акаунт ?{" "}
                <TouchableWithoutFeedback>
                  <Text style={register.signUpText}>Увійти</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const register = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  registerBoard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    height: "67.61%",
    width: "100%",
  },
  uploader: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circlePlus: {
    position: "absolute",
    right: -10,
    bottom: 20,
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
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  inputsWrap: {
    gap: 16,
    marginTop: 32,
    marginBottom: 32,
    width: "100%",
  },
  buttonWrap: {
    width: "100%",
    gap: 16,
  },
  signUpText: {
    textDecorationLine: "underline",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
