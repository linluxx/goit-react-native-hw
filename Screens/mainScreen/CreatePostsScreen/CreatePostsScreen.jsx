import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const CreatePostsScreen = () => {
  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.photoWrap}>
          <View style={styles.iconWrap}>
            <MaterialIcons name="camera-alt" size={30} color="#BDBDBD" />
          </View>
        </View>
        <Text style={styles.text}>Upload photo</Text>
        <TextInput
          placeholder="Name..."
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />
        <TextInput
          placeholder="Place..."
          placeholderTextColor="#BDBDBD"
          style={{ ...styles.input, marginBottom: 32 }}
        />

        <TouchableOpacity activeOpacity={0.7} style={styles.publishBtn}>
          <Text style={styles.publishBtnText}>Publish</Text>
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
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconWrap: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#f6f6f6",
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
