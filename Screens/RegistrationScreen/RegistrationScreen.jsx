import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { styles } from "./RegistrationScreen.styled";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const image = require("../../assets/images/background.png");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [inputBgColor, setInputBgColor] = useState("#F6F6F6");
  const [inputBorderColor, setInputBorderColor] = useState("#E8E8E8");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [iconName, setIconName] = useState("pluscircleo");
  const [iconColor, setIconColor] = useState("#FF6C00");

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const onInputFocus = () => {
    setIsShowKeyboard(true);

    setInputBgColor("#ffffff");
    setInputBorderColor("#FF6C00");
  };

  const onInputBlur = () => {
    setInputBgColor("#F6F6F6");
    setInputBorderColor("#E8E8E8");
  };

  const onAddPhoto = () => {
    if (iconName === "pluscircleo") {
      setIconName("closecircleo");
      setIconColor("#E8E8E8");
    } else {
      setIconName("pluscircleo");
      setIconColor("#FF6C00");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.wrap}>
              <View style={styles.avatar} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addBtn}
                onPress={onAddPhoto}
              >
                <AntDesign name={iconName} size={33} color={iconColor} />
              </TouchableOpacity>
              <View style={{ marginBottom: isShowKeyboard ? 32 : 43 }}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 16,
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  }}
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 16,
                    backgroundColor: inputBgColor,
                    borderColor: inputBorderColor,
                  }}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View>
                  <TextInput
                    secureTextEntry={isHidePassword}
                    style={{
                      ...styles.input,
                      backgroundColor: inputBgColor,
                      borderColor: inputBorderColor,
                      position: "relative",
                    }}
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.showBtn}
                    onPress={() => {
                      setIsHidePassword((prevState) => !prevState);
                    }}
                  >
                    <Text style={styles.showBtnText}>Show</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnText}> Sign Up</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Already have an account? Sign in</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
