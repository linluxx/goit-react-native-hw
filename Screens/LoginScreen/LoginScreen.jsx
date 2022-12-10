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

import { styles } from "./LoginScreen.styled";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const image = require("../../assets/images/background.png");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [inputBgColor, setInputBgColor] = useState("#F6F6F6");
  const [inputBorderColor, setInputBorderColor] = useState("#E8E8E8");
  const [isHidePassword, setIsHidePassword] = useState(true);

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

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.wrap}>
              <View style={{ marginBottom: isShowKeyboard ? 32 : 43 }}>
                <Text style={styles.title}>Sign In</Text>

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
                <Text style={styles.btnText}> Sign In</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Don't have an account? Sign up</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
