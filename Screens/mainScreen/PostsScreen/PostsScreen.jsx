import { Text, View, Image, StyleSheet } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileWrap}>
        <Image source={require("../../../assets/images/User.png")} />
        <View style={styles.textWrap}>
          <Text style={styles.name}>Natali Romanova </Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  profileWrap: {
    flexDirection: "row",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  textWrap: {
    marginLeft: 8,
    marginTop: 16,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
});
