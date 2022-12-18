import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

import LoginScreen from "../Screens/auth/LoginScreen/LoginScreen";
import Home from "../Screens/mainScreen/Home";
import RegistrationScreen from "../Screens/auth/RegistrationScreen/RegistrationScreen";
import { stateChangeUser } from "../redux/auth/authOperations";
import { getStateChange } from "../redux/auth/selectors";

const AuthStack = createStackNavigator();

const Main = () => {
  const stateChange = useSelector(getStateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      {stateChange ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        </AuthStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Main;
