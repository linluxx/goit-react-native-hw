import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { signOutUser } from "../../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/auth/selectors";

import db from "../../../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const image = require("../../../assets/images/background.png");
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  useEffect(() => {
    getUserPosts();
  }, []);

  getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => {
    dispatch(signOutUser());
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.wrap}>
        <Image
          style={styles.avatar}
          source={require("../../../assets/images/user2.png")}
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.addBtn}>
          <AntDesign name="closecircleo" size={30} color="#BDBDBD" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signOut}
          activeOpacity={0.8}
          style={styles.exitBtn}
        >
          <Feather name="log-out" size={27} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.title}>Natali Romanova</Text>
        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.postWrap}>
              <Image
                source={{ uri: item.photo }}
                style={{ width: 350, height: 200, borderRadius: 10 }}
              />
              <Text style={styles.postName}>{item.description}</Text>
              <View style={styles.postLabel}>
                <TouchableOpacity
                  style={styles.comments}
                  onPress={() => navigation.navigate("Comments", { item })}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color={item.commentsCount ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text
                    style={{
                      ...styles.commentsCount,
                      color: item.commentsCount ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {item.commentsCount ? item.commentsCount : 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.place}
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: item.location,
                      placeName: item.place,
                    })
                  }
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.placeText}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    position: "absolute",
    width: "100%",
    top: 0,
  },

  wrap: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    height: 600,
  },
  avatar: {
    zIndex: 1,
    position: "absolute",
    top: -55,
    left: 135,

    height: 120,
    width: 120,
    borderRadius: 16,
  },

  title: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontWight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginTop: 92,
    marginBottom: 32,
  },

  addBtn: {
    zIndex: 2,
    position: "absolute",
    top: 21,
    left: 240,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  exitBtn: {
    zIndex: 2,
    position: "absolute",
    top: 25,
    right: 10,
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
