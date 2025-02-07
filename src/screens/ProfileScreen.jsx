import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user/userOperations";
import {
  selectUser,
  selectIsLoading,
  selectError,
} from "../redux/user/userSelectors";
import {
  selectPosts,
  selectPostsLoading,
  selectPostsError,
  selectLastCreatedPost,
} from "../redux/post/postSelectors";
import { loadPosts } from "../redux/post/postOperations";

import * as ImagePicker from "expo-image-picker";

import { colors } from "../../styles/global";
import { CirclePlusSvg, CircleCrossSvg } from "../../assets/icons";
import Post from "../components/Post";
import LogoutButton from "../components/LogoutButton";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState("");
  const { posts } = useSelector(selectPosts);
  const { user } = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const lastPost = useSelector(selectLastCreatedPost);
  const isPostsLoading = useSelector(selectPostsLoading);
  const postsLoadingError = useSelector(selectPostsError);

  useEffect(() => {
    if (user?.uid) {
      dispatch(loadPosts(user.uid));
    }
  }, [lastPost, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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

  return (
    <>
      <Image
        source={require("../../assets/images/bg_native.png")}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.container}>
        <View style={styles.formContainer}>
          {!isLoading ? (
            <LogoutButton style={styles.logoutButton} onPress={handleLogout} />
          ) : (
            <ActivityIndicator size="small" style={styles.logoutButton} />
          )}

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

          <Text style={styles.title}>{user?.displayName}</Text>

          {/* Posts */}
          {isPostsLoading ? (
            <ActivityIndicator size="large" color={colors.blue} />
          ) : (
            <FlatList
              style={styles.postsContainer}
              data={posts}
              renderItem={({ item }) => (
                <Post
                  key={item.id}
                  image={{ uri: item.image }}
                  title={item.title}
                  location={item.address}
                  onLocationPress={() =>
                    navigation.navigate("MapScreen", { postId: item.id })
                  }
                  onCommentsPress={() =>
                    navigation.navigate("CommentsScreen", { postId: item.id })
                  }
                />
              )}
            />
          )}
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
    //paddingBottom: 79,
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
