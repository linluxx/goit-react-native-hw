import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import PostsScreen from "./PostsScreen/PostsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../redux/auth/authOperations";
const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <MainTab.Navigator
      initialRouteName="MainPosts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121CC",
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 60,
          paddingBottom: 25,
          height: 80,
        },
      }}
    >
      <MainTab.Screen
        name="MainPosts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity>
              <Feather
                name="grid"
                size={size}
                color={color}
                focused={focused}
              />
            </TouchableOpacity>
          ),
          tabBarItemStyle: {
            width: 70,
            height: 40,
          },
          tabBarHideOnKeyboard: true,

          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Create Post"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <TouchableOpacity>
              <Feather
                name="plus"
                size={size}
                color="#ffffff"
                focused={focused}
              />
            </TouchableOpacity>
          ),
          tabBarStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            width: 70,
            height: 40,
            marginHorizontal: 31,
          },
          tabBarHideOnKeyboard: true,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MainPosts")}
              activeOpacity={0.7}
              style={{ marginLeft: 16 }}
            >
              <Feather name="arrow-left" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 1,
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TouchableOpacity>
              <Feather
                name="user"
                size={size}
                color={color}
                focused={focused}
              />
            </TouchableOpacity>
          ),
          tabBarItemStyle: {
            width: 70,
            height: 40,
          },
          tabBarHideOnKeyboard: true,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 16 }}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
