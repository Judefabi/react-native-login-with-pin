import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../Authentication/Register";
import Email from "../Authentication/Email";
import Login from "../Authentication/Login";
import Pin from "../Authentication/Pin";
import Confirmpin from "../Authentication/Confirmpin";
import Forgotpin from "../Authentication/Forgotpin";
import Home from "../Pages/Home";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  let routename;
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; //handle error message to show if
  } else if (isFirstLaunch === true) {
    routename = "Register";
  } else {
    routename = "Register";
  }
  return (
    <Stack.Navigator
      initialRouteName={routename}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Pin" component={Pin} />
      <Stack.Screen name="Confirmpin" component={Confirmpin} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgotpin" component={Forgotpin} />
      <Stack.Screen name="Home Stack" component={Home} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
