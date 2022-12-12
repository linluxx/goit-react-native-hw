import { View, Text, Image, StyleSheet } from "react-native";

const CommentsScreen = ({ route }) => {
  const photo = route.params.item.photo;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo }}
        style={{ width: 360, height: 250, borderRadius: 10 }}
      />
      <Text style={styles.comments}> Comments here</Text>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  comments: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Roboto-Regular",
  },
});
