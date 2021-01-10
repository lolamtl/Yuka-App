import React, { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "./containers/HomeScreen";
import ProductScreen from "./containers/ProductScreen";
import CameraScreen from "./containers/CameraScreen";
import FavoritesScreen from "./containers/FavoritesScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [product, setProduct] = useState([]);
  const [code, setCode] = useState(null);
  return (
    <NavigationContainer style={styles.scrollView}>
      <StatusBar backgroundColor="#57B96D" />
      <Tab.Navigator
        style={styles.scrollView}
        tabBarOptions={{
          activeTintColor: "orange",
          inactiveTintColor: "white",
          style: { backgroundColor: "#5DCC71" },
          showIcon: true,
          showLabel: false,
          backBehavior: "none",
          indicatorStyle: {
            backgroundColor: "orange",
          },
        }}
      >
        <Tab.Screen
          name="Historique"
          options={{
            tabBarLabel: "Historique",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="carrot" size={20} color={color} />
            ),
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                options={{
                  header: () => null,
                  animationEnabled: false,
                }}
              >
                {() => <HomeScreen product={product} setProduct={setProduct} />}
              </Stack.Screen>
              <Stack.Screen
                name="Product"
                options={{
                  title: "Product",
                  headerTitle: false,
                }}
              >
                {(props) => <ProductScreen {...props} product={product} />}
              </Stack.Screen>
              <Stack.Screen
                name="Caméra"
                options={{
                  header: () => null,
                  animationEnabled: false,
                }}
              >
                {() => <CameraScreen code={code} setCode={setCode} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Favorites"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="favorite-border" size={24} color={color} />
            ),
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Favorites"
                options={{
                  header: () => null,
                  animationEnabled: false,
                }}
              >
                {(props) => <FavoritesScreen {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
  },
});
