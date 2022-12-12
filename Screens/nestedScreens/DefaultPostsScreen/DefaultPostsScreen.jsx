import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.profileWrap}>
        <Image source={require("../../../assets/images/User.png")} />
        <View style={styles.textWrap}>
          <Text style={styles.name}>Natali Romanova </Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postWrap}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200, borderRadius: 10 }}
            />
            <Text style={styles.postName}>{item.state.name}</Text>
            <View style={styles.postLabel}>
              <TouchableOpacity
                style={styles.comments}
                onPress={() => navigation.navigate("Comments", { item })}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.place}
                onPress={() => navigation.navigate("Map", { item })}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.placeText}>{item.state.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultPostsScreen;

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

  postWrap: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },

  postName: {
    marginVertical: 8,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  postLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
  },
  place: {
    flexDirection: "row",
  },
  placeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});
