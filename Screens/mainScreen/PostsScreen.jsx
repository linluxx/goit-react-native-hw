import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen/DefaultPostsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen/CommentsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../redux/auth/authOperations";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  dispatch = useDispatch();
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        component={DefaultPostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => dispatch(signOutUser())}
              activeOpacity={0.7}
              style={{ marginRight: 16 }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 1,
          },
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
