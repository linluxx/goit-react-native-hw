import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { signOutUser } from "../../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/auth/selectors";
import styles from "./ProfileScreen.styled";
import { getLogin } from "../../../redux/auth/selectors";

import db from "../../../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const image = require("../../../assets/images/tree.jpg");
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const login = useSelector(getLogin);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
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
          source={require("../../../assets/images/mandarin.png")}
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
        <Text style={styles.title}>{login}</Text>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
                        color: item.commentsCount ? "#124250" : "#BDBDBD",
                      }}
                    >
                      {item.commentsCount ? item.commentsCount : 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} style={styles.likes}>
                    <Feather
                      name="thumbs-up"
                      size={24}
                      color={item.likes ? "#FF6C00" : "#BDBDBD"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...styles.commentsCount,
                      color: item.likes ? "#124250" : "#BDBDBD",
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
    </View>
  );
};

export default ProfileScreen;
