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
  const { product, setProduct } = props;
  const [data, setData] = useState();
  const [products, setProducts] = useState();
  const { params } = useRoute();
  // console.log(props.product.code);
  // console.log(Platform);

  useEffect(() => {
    const saveProducts = async () => {
      const keep = await AsyncStorage.getItem("pdt");
      const storage = JSON.parse(keep);
      setProducts(storage);
    };

    saveProducts(products);
  }, []);
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Product", {
                  code: item.id,
                });
              }}
            >
              {item.id && item.image && item.name && item.brand ? (
                <View style={styles.view}>
                  <View>
                    <Image
                      style={{ height: 100, width: 80, borderRadius: 10 }}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={styles.infos}>
                    <View style={styles.favoris}>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                    <Text>{item.brand}</Text>
                    <View>
                      <View style={styles.grade}>
                        {item.nutriScore === "a" || item.ecoscore === "a" ? (
                          <View style={styles.grade}>
                            <FontAwesome
                              name="circle"
                              size={24}
                              color="green"
                            />
                            <View style={styles.note}>
                              <Text style={styles.score}>
                                {item.note}/100
                                <Text>(A REVOIR)</Text>
                              </Text>
                              <Text>Excellent!</Text>
                            </View>
                          </View>
                        ) : item.nutriScore === "b" || item.ecoscore === "b" ? (
                          <View style={styles.grade}>
                            <FontAwesome
                              name="circle"
                              size={24}
                              color="#5DCC71"
                            />
                            <View style={styles.note}>
                              <Text style={styles.score}>
                                {item.note}
                                {/* // data.product.ecoscore_score} */}
                                /100
                                <Text>(A REVOIR)</Text>
                              </Text>
                              <Text>Trés bon</Text>
                            </View>
                          </View>
                        ) : item.nutriScore === "c" || item.ecoscore === "c" ? (
                          <View style={styles.grade}>
                            <FontAwesome
                              name="circle"
                              size={24}
                              color="yellow"
                            />
                            <View style={styles.note}>
                              <Text style={styles.score}>
                                {item.note.toFixed(2)}
                                {/* data.product.ecoscore_score} */}
                                /100
                                <Text>(A REVOIR)</Text>
                              </Text>
                              <Text>Bon</Text>
                            </View>
                          </View>
                        ) : item.nutriScore === "d" || item.ecoscore === "d" ? (
                          <View style={styles.grade}>
                            <FontAwesome
                              name="circle"
                              size={24}
                              color="orange"
                            />
                            <View style={styles.note}>
                              <Text style={styles.score}>
                                {item.note}/100
                                <Text>(A REVOIR)</Text>
                              </Text>
                              <Text>Médiocre</Text>
                            </View>
                          </View>
                        ) : item.nutriScore === "e" || item.ecoscore === "e" ? (
                          <View style={styles.grade}>
                            <FontAwesome
                              name="circle"
                              size={24}
                              color="#D50506"
                            />
                            <View style={styles.note}>
                              <Text style={styles.score}>
                                {item.note}/100
                                <Text>(A REVOIR)</Text>
                              </Text>
                              <Text>Mauvais</Text>
                            </View>
                          </View>
                        ) : item.nutriScore === "no_value" ||
                          item.ecoscore === undefined ? (
                          <View>
                            <FontAwesome
                              name="circle"
                              size={24}
                              color="#D1D1D1"
                            />
                            <Text>
                              Pas de note pour ce produit pour l'instant
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        />

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
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
  },
  view: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
  },
  infos: {
    paddingLeft: 20,
    flex: 1,
  },
  grade: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  note: {
    paddingLeft: 10,
  },
  score: {
    fontWeight: "bold",
  },
  description: {
    // flex: 1,
    marginTop: 10,
    backgroundColor: "white",
    padding: 20,
  },
  button: {
    position: "absolute",
    backgroundColor: "#5DCC71",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: Platform.OS === "ios" ? 500 : 50,
    right: 20,
  },
  text: { fontSize: 18 },
});
