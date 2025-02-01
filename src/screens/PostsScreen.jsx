import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../../styles/global";
import Post from "../components/Post";
const PostsScreen = ({ navigation, route }) => {
  const post = route?.params?.post;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../../assets/images/default-avatar.jpg")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      {post && (
        <Post
          image={{ uri: post.image }}
          title={post.title}
          location={post.address}
          onLocationPress={() => navigation.navigate("MapScreen", { post })}
          onCommentsPress={() =>
            navigation.navigate("CommentsScreen", { post })
          }
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
});

export default PostsScreen;
