import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import db from "../../../firebase/config";
import { getLogin, getUserId } from "../../../redux/auth/selectors";
import styles from "./CreatePostsScreen.styled";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const snap = await camera.takePictureAsync();
    const loc = await Location.getCurrentPositionAsync();
    setPhoto(snap.uri);
    console.log(loc);
    setLocation(loc.coords);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Posts");
    setDescription("");
    setPlace("");
    setPhoto(null);
  };

  const login = useSelector(getLogin);
  const userId = useSelector(getUserId);

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    console.log(location);
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, place, description, location, userId, login });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    console.log("processedPhoto", processedPhoto);
    return processedPhoto;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const clearPost = () => {
    setDescription("");
    setPhoto(null);
    setPlace("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View>
          <Camera style={styles.photoWrap} ref={setCamera}>
            {photo && (
              <View style={styles.takePhotoWrap}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 240, width: 360 }}
                />
              </View>
            )}

            <TouchableOpacity style={styles.iconWrap} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={30} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          <TouchableOpacity onPress={pickImage}>
            {!photo ? (
              <Text style={styles.text}>Upload photo</Text>
            ) : (
              <Text style={styles.text}>Change photo</Text>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Name..."
            placeholderTextColor="#BDBDBD"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            placeholder="Place..."
            placeholderTextColor="#BDBDBD"
            style={{ ...styles.input, marginBottom: 32 }}
            value={place}
            onChangeText={setPlace}
          />

          <TouchableOpacity
            disabled={photo ? false : true}
            onPress={sendPhoto}
            activeOpacity={0.7}
            style={
              photo
                ? { ...styles.publishBtn, backgroundColor: "#FF6C00" }
                : styles.publishBtn
            }
          >
            <Text
              style={
                photo
                  ? { ...styles.publishBtnText, color: "#fff" }
                  : styles.publishBtnText
              }
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={clearPost}
          activeOpacity={0.7}
          style={styles.deleteBtn}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
