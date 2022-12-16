import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import db from "../../../firebase/config";

import { getLogin } from "../../../redux/auth/selectors";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(null);
  const photo = route.params.item.photo;
  const postId = route.params.item.id;
  const login = useSelector(getLogin);
  const item = route.params.item;

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    console.log(item);
    const date = new Date().toLocaleString();
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, date });
    setComment("");
    db.firestore()
      .collection("posts")
      .doc(postId)
      .set({ ...item, commentsCount: allComments.length + 1 });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      <SafeAreaView style={styles.container2}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.commentContainer}>
                <Text>{item.login}</Text>
                <Text>{item.comment}</Text>
                <Text>{item.date}</Text>
              </View>
              <View style={styles.avatar}></View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Comment.."
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
          <Feather name="arrow-up" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  image: {
    width: 360,
    height: 250,
    borderRadius: 10,
    marginBottom: 32,
  },
  container2: {
    flex: 1,

    // marginTop: StatusBar.currentHeight || 0,
  },
  commentContainer: {
    width: 300,
    height: 103,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  comments: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Roboto-Regular",
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: "#e8e8e8",
    borderRadius: 50,
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    borderRadius: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    paddingLeft: 15,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    position: "relative",
  },
  sendBtn: {
    position: "absolute",
    width: 37,
    height: 37,
    borderRadius: 50,
    backgroundColor: "#ff6c00",
    top: 6,
    left: 315,
    alignItems: "center",
    justifyContent: "center",
  },
});
