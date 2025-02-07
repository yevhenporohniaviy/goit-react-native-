import { FC, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  TrashCan,
  MapMarkerGray,
  Camera as CameraIcon,
} from "../../assets/icons";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { uploadImage } from "../services/firebaseStore";
import { selectUser } from "../redux/user/userSelectors";
import { createPost } from "../redux/post/postOperations";
import { selectPostCreate } from "../redux/post/postSelectors";

import { colors } from "../../styles/global";

import Button from "../components/Button";
import Input from "../components/Input";

const PLACES_KEY = "Не вдалось карту підєднати для сервіса";

const CreatePostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [facing] = useState("back");
  const { user } = useSelector(selectUser);
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const cameraView = useRef(null);
  const placesRef = useRef(null);
  const [location, setLocation] = useState(null);
  const { lastPost, isLoading, error } = useSelector(selectPostCreate);

  useEffect(() => {
    if (lastPost) {
      navigation.navigate("PostsScreen");
    }
  }, [lastPost]);

  if (!permission) {
    return <View style={styles.section} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.section}>
        <Text style={styles.message}>
          Нам потрібен дозвіл на використання камери
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Надати дозвіл</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      if (!cameraView.current) return;
      const photo = await cameraView.current.takePictureAsync();
      setSelectedImage(photo.uri);
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Необхідний дозвіл на доступ до галереї");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const onClearData = () => {
    setSelectedImage(null);
    setTitle("");
    setAddress("");
    placesRef.current?.clear();
  };

  const uploadImageToStorage = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(selectedImage);
      const file = await response.blob();
      const fileName = selectedImage.split("/").pop(); // Отримуємо ім'я файлу з URI
      const fileType = file.type; // Отримуємо тип файлу
      const imageFile = new File([file], fileName, { type: fileType });

      const uploadedImageUrl = await uploadImage(user.uid, imageFile, fileName);

      return uploadedImageUrl;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const onPublish = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Необхідний дозвіл на визначення місцезнаходження");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      const post = {
        id: user.uid + Date.now().toString(32),
        userId: user.uid,
        image: await uploadImageToStorage(selectedImage),
        title,
        address,
        location: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
      };

      console.log("post:", post);
      onClearData();

      dispatch(createPost(post));
    } catch (error) {
      console.log("Error publishing post:", error);
      alert("Помилка при публікації поста");
    }
  };

  const isDisabled = !(title && address && selectedImage);

  return (
    <View style={styles.section}>
      <View style={styles.imageContainer}>
        <View style={styles.emptyImgContainer}>
          {!selectedImage ? (
            <CameraView style={styles.camera} facing={facing} ref={cameraView}>
              <View style={styles.cameraContent}>
                <TouchableOpacity
                  style={styles.cameraIconWrapper}
                  onPress={takePicture}
                >
                  <CameraIcon width={24} height={24} />
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            <>
              <Image source={{ uri: selectedImage }} style={styles.image} />
              <TouchableOpacity
                style={styles.cameraIconWrapper}
                onPress={() => setSelectedImage(null)}
              >
                <CameraIcon width={24} height={24} />
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity onPress={pickImage}>
          <Text style={[styles.btnText, styles.grayText]}>
            {selectedImage ? "Змінити фото" : "Завантажте фото"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Input
            value={title}
            placeholder="Назва..."
            outerStyles={styles.input}
            onTextChange={setTitle}
          />

          <View style={styles.locationInputContainer}>
            <MapMarkerGray width={24} height={24} style={styles.mapMarker} />
            <GooglePlacesAutocomplete
              ref={placesRef}
              placeholder="Місцевість..."
              minLength={4}
              enablePoweredByContainer={false}
              fetchDetails
              onPress={(data, details = null) => {
                setAddress(data.description);
              }}
              query={{ key: PLACES_KEY }}
              styles={{
                container: {
                  flex: 1,
                },
                textInputContainer: {
                  flexDirection: "row",
                  paddingHorizontal: 0,
                },
                textInput: {
                  paddingVertical: 5,
                  paddingHorizontal: 28,
                  fontSize: 15,
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: colors.border_gray,
                },
                row: {
                  backgroundColor: "#FFFFFF",
                  padding: 13,
                  height: 44,
                  flexDirection: "row",
                },
                predefinedPlacesDescription: {
                  color: "#1faadb",
                },
                listView: {
                  maxHeight: 160,
                },
              }}
            />
          </View>
        </KeyboardAvoidingView>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button onPress={onPublish} isDisabled={isDisabled}>
            <Text
              style={{
                ...styles.btnText,
                ...(isDisabled ? styles.unactiveBtnText : null),
              }}
            >
              Опублікувати
            </Text>
          </Button>
        )}

        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button buttonStyle={styles.deleteBtn} onPress={onClearData}>
          <TrashCan width={24} height={24} />
        </Button>
      </View>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: 32,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "400",
    color: colors.white,
    textAlign: "center",
  },
  unactiveBtnText: {
    color: colors.text_gray,
  },
  grayText: {
    textAlign: "left",
    color: colors.text_gray,
  },
  imageContainer: {
    gap: 8,
  },
  emptyImgContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIconWrapper: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  input: {
    width: "100%",
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: colors.white,
    paddingLeft: 0,
  },
  deleteBtn: {
    display: "flex",
    width: 70,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light_gray,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  cameraContent: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  mapMarker: {
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 1000,
  },
  error: {
    color: colors.red,
    textAlign: "center",
    fontSize: 16,
  },
});
