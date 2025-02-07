import { StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  PostsIcon,
  UserIcon,
  WideCirclePlus,
  ArrowLeft,
} from "../../assets/icons";

import ProfileScreen from "../screens/ProfileScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import LogoutButton from "../components/LogoutButton";
import PostsScreen from "../screens/PostsScreen";
import { logoutUser } from "../redux/user/userOperations";
import { selectIsLoading, selectError } from "../redux/user/userSelectors";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  console.log(error);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ navigation }) => ({
        tabBarLabel: "label",
        tabBarStyle: {
          display: "flex",
          height: 83,
          paddingVertical: 16,
          justifyContent: "space-between",
          paddingHorizontal: 31,
        },
        tabBarItemStyle: {
          marginHorizontal: 15.5,
          marginTop: 9,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          headerRight: () =>
            !isLoading ? (
              <LogoutButton
                style={{ paddingRight: 10 }}
                onPress={handleLogout}
              />
            ) : (
              <ActivityIndicator size="small" style={{ paddingRight: 10 }} />
            ),
          tabBarIcon: ({ focused }) => <PostsIcon width={24} height={24} />,
        })}
      />

      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <WideCirclePlus width={70} height={40} />
          ),
          headerLeft: () => (
            <ArrowLeft
              width={24}
              height={24}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRightContainerStyle: { paddingRight: 8 },
          headerShown: false,
          tabBarIcon: ({ focused }) => <UserIcon width={24} height={24} />,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
