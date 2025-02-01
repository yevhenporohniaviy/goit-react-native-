import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../../styles/global";

const Comment = ({ text, date, avatar, align = "left" }) => {
  const isLeft = align === "left";

  return (
    <View
      style={[
        styles.container,
        isLeft ? styles.containerLeft : styles.containerRight,
      ]}
    >
      <Image
        source={avatar}
        style={[styles.avatar, isLeft ? styles.avatarLeft : styles.avatarRight]}
      />
      <View
        style={[
          styles.textContainer,
          isLeft ? styles.textContainerLeft : styles.textContainerRight,
        ]}
      >
        <Text style={styles.text}>{text}</Text>
        <Text
          style={[styles.date, isLeft ? styles.dateLeft : styles.dateRight]}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 24,
    width: "100%",
  },
  containerLeft: {
    flexDirection: "row",
  },
  containerRight: {
    flexDirection: "row-reverse",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  avatarLeft: {
    marginRight: 16,
  },
  avatarRight: {
    marginLeft: 16,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  textContainerLeft: {
    borderTopLeftRadius: 0,
  },
  textContainerRight: {
    borderTopRightRadius: 0,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: colors.black_primary,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: colors.text_gray,
    marginTop: 8,
  },
  dateLeft: {
    textAlign: "right",
  },
  dateRight: {
    textAlign: "left",
  },
});

export default Comment;
