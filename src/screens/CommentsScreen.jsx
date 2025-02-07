import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPostById,
  loadComments,
  createComment,
} from "../redux/post/postOperations";
import {
  selectPostById,
  selectComments,
  selectCommentCreate,
} from "../redux/post/postSelectors";
import { selectUser } from "../redux/user/userSelectors";
import { colors } from "../../styles/global";
import Comment from "../components/Comment";
import Input from "../components/Input";
import { SendIcon } from "../../assets/icons";
import { v4 as uuidv4 } from "uuid";

const CommentsScreen = ({ route }) => {
  const postId = route?.params?.postId;
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { post, isLoading, error } = useSelector(selectPostById);
  const {
    comments = [],
    isLoading: commentsLoading,
    error: commentsError,
  } = useSelector(selectComments);
  const {
    lastComment,
    isLoading: lastCommentLoading,
    error: lastCommentError,
  } = useSelector(selectCommentCreate);

  useEffect(() => {
    if (postId) {
      dispatch(loadPostById(postId));
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      dispatch(loadComments(postId));
    }
  }, [postId]);

  useEffect(() => {
    if (lastComment) {
      dispatch(loadComments(postId));
    }
  }, [lastComment]);

  console.log("post", post);

  if (isLoading) {
    return (
      <View style={styles.section}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.section}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const handleCommentSubmit = (text) => {
    dispatch(
      createComment({
        id: uuidv4(),
        comment,
        postId,
        userId: user.uid,
        date: new Date().toISOString(),
      }),
    );
    setComment("");
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const SendBtn = () => (
    <TouchableOpacity
      onPress={handleCommentSubmit}
      style={styles.sendBtn}
      disabled={lastCommentLoading}
    >
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
                data={comments}
                renderItem={({ item }) => (
                  <Comment
                    text={item.comment}
                    date={item.date}
                    avatar={require("../../assets/images/default-avatar.jpg")}
                    align={item.userId === user.uid ? "right" : "left"}
                  />
                )}
              />
              {commentsLoading && <ActivityIndicator size="large" />}

              {commentsError && <Text>Error: {commentsError}</Text>}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Input
              outerStyles={styles.input}
              value={comment}
              onTextChange={handleCommentChange}
              placeholder="Коментувати..."
              rightButton={
                lastCommentLoading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <SendBtn />
                )
              }
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
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentsScreen;
