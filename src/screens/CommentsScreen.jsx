import React from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../styles/global";
import Comment from "../components/Comment";
import Input from "../components/Input";
import { SendIcon } from "../../assets/icons";
const CommentsScreen = ({ route }) => {
  const post = route?.params?.post;

  const testComments = [
    {
      text: "This is such a stunning shot! The lighting is absolutely perfect.",
      date: "February 1, 2025 | 10:15 AM",
      avatar: require("../../assets/images/default-avatar.jpg"),
    },
    {
      text: "Thank you! I used natural light during golden hour to get this effect.",
      date: "February 1, 2025 | 10:45 AM",
      avatar: require("../../assets/images/default-avatar.jpg"),
      align: "right",
    },
  ];

  const SendBtn = () => (
    <TouchableOpacity style={styles.sendBtn}>
      <SendIcon />
    </TouchableOpacity>
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="height"
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image source={{ uri: post.image }} style={styles.image} />
            <View style={styles.commentsContainer}>
              <FlatList
                style={styles.commentsList}
                data={testComments}
                renderItem={({ item }) => (
                  <Comment
                    text={item.text}
                    date={item.date}
                    avatar={item.avatar}
                    align={item.align}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Input
              outerStyles={styles.input}
              placeholder="Коментувати..."
              rightButton={<SendBtn />}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
  },
  commentsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    marginTop: 32,
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.gray,
    padding: 16,
    paddingRight: 42,
  },
  sendBtn: {
    height: 34,
    width: 34,
    borderRadius: 100,
    position: "absolute",
    right: 4,
    bottom: 8,
  },
  commentsList: {
    width: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default CommentsScreen;
