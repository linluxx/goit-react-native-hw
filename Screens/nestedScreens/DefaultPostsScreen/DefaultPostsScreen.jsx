import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import db from "../../../firebase/config";
import { getEmail } from "../../../redux/auth/selectors";
import { getLogin } from "../../../redux/auth/selectors";
import styles from "./DefaultPostsScreen.styled";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const email = useSelector(getEmail);
  const login = useSelector(getLogin);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  const onLike = async (item) => {
    let likes = item.likes ? item.likes + 1 : 0 + 1;

    await db
      .firestore()
      .collection("posts")
      .doc(item.id)
      .set({ ...item, likes });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.profileWrap}>
        <Image source={require("../../../assets/images/User.png")} />
        <View style={styles.textWrap}>
          <Text style={styles.name}>{login} </Text>
          <Text style={styles.email}>{email}</Text>
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
            <Text style={styles.postName}>{item.description}</Text>
            <View style={styles.postLabel}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.comments}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      item,
                    })
                  }
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
                  onPress={() => {
                    onLike(item);
                  }}
                  style={styles.likes}
                >
                  <Feather
                    name="thumbs-up"
                    size={24}
                    color={item.likes ? "#FF6C00" : "#BDBDBD"}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...styles.commentsCount,
                    color: item.likes ? "#212121" : "#BDBDBD",
                  }}
                >
                  {item.likes ? item.likes : 0}
                </Text>
              </View>
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
  );
};

export default DefaultPostsScreen;
