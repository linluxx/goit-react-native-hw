import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";

import { useEffect } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

const initialState = {
  name: "",
  place: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState(null);
  const [publishBtnColor, setPublishBtnColor] = useState("#f6f6f6");
  const [publishBtnColorText, setPublishBtnColorText] = useState("#BDBDBD");

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
    })();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const snap = await camera.takePictureAsync();
    setPublishBtnColor("#FF6C00");
    setPublishBtnColorText("#FFF");
    const loc = await Location.getCurrentPositionAsync();
    setPhoto(snap.uri);
    console.log(loc);
    setLocation(loc.coords);
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultPostsScreen", { photo, state, location });
    setState(initialState);
    setPhoto(null);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
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
        <Text style={styles.text}>Upload photo</Text>
        <TextInput
          placeholder="Name..."
          placeholderTextColor="#BDBDBD"
          style={styles.input}
          value={state.name}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, name: value }))
          }
        />
        <TextInput
          placeholder="Place..."
          placeholderTextColor="#BDBDBD"
          style={{ ...styles.input, marginBottom: 32 }}
          value={state.place}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, place: value }))
          }
        />

        <TouchableOpacity
          onPress={sendPhoto}
          activeOpacity={0.7}
          style={{ ...styles.publishBtn, backgroundColor: publishBtnColor }}
        >
          <Text
            style={{ ...styles.publishBtnText, color: publishBtnColorText }}
          >
            Publish
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    paddingVertical: 32,
    backgroundColor: "#ffffff",
  },
  photoWrap: {
    width: 360,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "E8E8E8",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 8,
  },

  iconWrap: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    marginTop: 170,
  },
  takePhotoWrap: {
    position: "absolute",

    // borderColor: "green",
    borderWidth: 3,
    width: 360,
    height: 240,
    // borderRadius: 20,
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 32,
  },
  input: {
    height: 50,
    width: 343,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  publishBtn: {
    width: 343,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  publishBtnText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },
});
