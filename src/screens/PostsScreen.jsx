import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { colors } from "../../styles/global";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { loadPosts } from "../redux/post/postOperations";
import {
  selectPosts,
  selectLastCreatedPost,
  selectPostsLoading,
  selectPostsError,
} from "../redux/post/postSelectors";
import { selectUser } from "../redux/user/userSelectors";
import { useEffect } from "react";

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector(selectPosts);
  const { user } = useSelector(selectUser);
  const lastPost = useSelector(selectLastCreatedPost);
  const isLoading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (user?.uid) {
      dispatch(loadPosts(user.uid));
    }
  }, [lastPost, user]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {user?.photoURL ? (
          <Image source={{ uri: user?.photoURL }} style={styles.avatar} />
        ) : (
          <Image
            source={require("../../assets/images/default-avatar.jpg")}
            style={styles.avatar}
          />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>
      {isLoading ? (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: colors.black_primary,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsContainer: {
    marginTop: 32,
  },
});

export default PostsScreen;
