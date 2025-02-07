import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import MapScreen from "../screens/MapScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import CommentsScreen from "../screens/CommentsScreen";

import BottomTabNavigator from "./BottomTabNavigator";
import { ArrowLeft } from "../../assets/icons";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSelectors";
import { useEffect } from "react";
const Stack = createStackNavigator();

const MainNavigator = () => {
  const navigation = useNavigation();
  const { user } = useSelector(selectUser);
  const initialRouteName = user ? "Home" : "Login";

  useEffect(() => {
    if (user && user?.uid) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen
        name="MapScreen"
        options={{
          headerShown: true,
          headerTitle: "Карта",
          headerLeft: () => (
            <ArrowLeft
              width={24}
              height={24}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
        component={MapScreen}
      />
      <Stack.Screen
        name="CommentsScreen"
        options={{
          headerShown: true,
          headerTitle: "Коментарі",
          headerLeft: () => (
            <ArrowLeft
              width={24}
              height={24}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
        component={CommentsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
