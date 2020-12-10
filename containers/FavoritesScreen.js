import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Button, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(params.code);

  useEffect(() => {
    const saveProducts = async () => {
      const prod = await AsyncStorage.getItem("product");
      const storage = JSON.parse(prod);
      setData(storage);
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${params.code}`
        );
        if (response.data) {
          setData(response.data);
          saveProducts(response.data);
          setIsLoading(false);
        } else {
          alert("Ca passe pas");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    saveProducts();
    fetchData();
  }, []);

  return (
    <View>
      {/* <FlatList
      data={data}
      keyExtractor={item => String(item.id)}
          renderItem={({ item }) => ( */}
      {/* <Text style={styles.text}>{data.product.product_name}</Text> */}

      {/* <Text>{data.product.brands}</Text>
        <Image
        style={{ height: 100, width: 80, borderRadius: 10 }}
        source={{ uri: data.product.image_url }}
        />
        <View>
        {data.product.nutrition_grade_fr === "a" ? (
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
    </View>
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
