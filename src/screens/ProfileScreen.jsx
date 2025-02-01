import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../../styles/global";
import { CirclePlusSvg, CircleCrossSvg, LogoutIcon } from "../../assets/icons";
import Post from "../components/Post";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const RegistrationScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState("");

  const handlePhotoUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Необхідний дозвіл на доступ до галереї");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Помилка при завантаженні фото:", error);
      alert("Помилка при завантаженні фото");
    }
  };

  const handlePhotoRemove = () => {
    setPhoto("");
  };

  const testPosts = [
    {
      image: require("../../assets/images/default-avatar.jpg"),
      title: "Ліс",
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
      image: require("../../assets/images/default-avatar.jpg"),
      title: "Ліс",
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
      image: require("../../assets/images/default-avatar.jpg"),
      title: "Ліс",
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
      image: require("../../assets/images/default-avatar.jpg"),
      title: "Ліс",
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
  ];

  return (
    <>
      <Image
        source={require("../../assets/images/bg_native.png")}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate("Login")}
          >
            <LogoutIcon width={24} height={24} />
          </TouchableOpacity>

          <View style={styles.photoContainer}>
            {photo && (
              <>
                <Image source={{ uri: photo }} style={styles.photo} />
                <Pressable
                  onPress={handlePhotoRemove}
                  style={styles.circlePlus}
                >
                  <CircleCrossSvg />
                </Pressable>
              </>
            )}

            {!photo && (
              <Pressable onPress={handlePhotoUpload} style={styles.circlePlus}>
                <CirclePlusSvg />
              </Pressable>
            )}
          </View>

          <Text style={styles.title}>Natali Romanova</Text>

          {/* Posts */}
          <FlatList
            style={styles.postsContainer}
            data={testPosts}
            renderItem={({ item }) => (
              <Post
                image={item.image}
                title={item.title}
                location={item.location}
              />
            )}
          />
        </View>
      </View>
    </>
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
  },
  photoContainer: {
    position: "absolute",
    top: -60,
    bottom: 0,
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
    position: "absolute",
    top: 0,
    bottom: 0,
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  postsContainer: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  logoutButton: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
