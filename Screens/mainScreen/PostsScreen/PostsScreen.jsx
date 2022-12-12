import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../../nestedScreens/DefaultPostsScreen/DefaultPostsScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
