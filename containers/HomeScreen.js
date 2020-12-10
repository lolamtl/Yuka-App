import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { FloatingAction } from "react-native-floating-action";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import Constants from "expo-constants";

import axios from "axios";

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const { product, setProduct } = props;
  const [data, setData] = useState();
  const { params } = useRoute();
  // console.log(props.product.code);
  // console.log(Platform);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://world.openfoodfacts.org/api/v0/product/737628064502.json "
          // `https://world.openfoodfacts.org/api/v0/product/${props.product.code}.json`
        );
        // const code = await AsyncStorage.getItem("code");
        // console.log(code);
        // if (response.data) {
        setData(response.data);
        // }
        // console.log("loook HERREEEEEEEEE --------------->");
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    setIsLoading(false);
    fetchData();
  }, []);

  return isLoading ? (
    <View>
      <ActivityIndicator
        size="large"
        color="#FF9100"
        style={{ paddingTop: 30 }}
      />
    </View>
  ) : (
    <ScrollView>
      {/* <View> */}
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate("Product");
        }}
      > */}
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      <Text style={styles.text}>Go to product screen</Text>
      {/* <Text style={styles.text}>{data.product.product_name}</Text> */}

      {/* <Text>{product.product.brands}</Text>
        <Image
        style={{ height: 100, width: 80, borderRadius: 10 }}
        source={{ uri: product.product.image_url }}
        />
        <View>
        {product.product.nutrition_grade_fr === "a" ? (
          <View>
          <FontAwesome name="circle" size={24} color="green" />
          <Text>Excellent!</Text>
          </View>
          ) : product.product.nutrition_grade_fr === "b" ? (
            <View>
            <FontAwesome name="circle" size={24} color="#5DCC71" />
            <Text>Trés bon</Text>
            </View>
            ) : product.product.nutrition_grade_fr === "c" ? (
              <View>
              <FontAwesome name="circle" size={24} color="yellow" />
              <Text>Bon</Text>
              </View>
              ) : product.product.nutrition_grade_fr === "d" ? (
                <View>
                <FontAwesome name="circle" size={24} color="orange" />
                <Text>Médiocre</Text>
                </View>
                ) : product.product.nutrition_grade_fr === "e" ? (
                  <View>
                  <FontAwesome name="circle" size={24} color="#D50506" />
                  <Text>Mauvais</Text>
                  </View>
                  ) : (
                    <Text> NO grade</Text>
                    )}
                    </View>
                  <Entypo name="back-in-time" size={24} color="black" /> */}
      {/* </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Caméra");
        }}
      >
        <MaterialCommunityIcons
          name="barcode-scan"
          size={30}
          color="white"
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      {/* </View> */}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    position: "absolute",
    backgroundColor: "#5DCC71",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: Platform.OS === "android" ? 600 : 500,
    right: 20,
  },
  text: { fontSize: 30 },
});
