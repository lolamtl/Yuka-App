import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
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
  Image,
  Platform,
} from "react-native";
import carott from "../assets/carott.png";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState();

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
      <ScrollView style={styles.home}>
        {products ? (
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
                {item.id && item.name ? (
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
                                <Text>Excellent!</Text>
                              </View>
                            </View>
                          ) : item.nutriScore === "b" ||
                            item.ecoscore === "b" ? (
                            <View style={styles.grade}>
                              <FontAwesome
                                name="circle"
                                size={24}
                                color="#5DCC71"
                              />
                              <View style={styles.note}>
                                <Text>Trés bon</Text>
                              </View>
                            </View>
                          ) : item.nutriScore === "c" ||
                            item.ecoscore === "c" ? (
                            <View style={styles.grade}>
                              <FontAwesome
                                name="circle"
                                size={24}
                                color="yellow"
                              />
                              <View style={styles.note}>
                                <Text>Bon</Text>
                              </View>
                            </View>
                          ) : item.nutriScore === "d" ||
                            item.ecoscore === "d" ? (
                            <View style={styles.grade}>
                              <FontAwesome
                                name="circle"
                                size={24}
                                color="orange"
                              />
                              <View style={styles.note}>
                                <Text>Médiocre</Text>
                              </View>
                            </View>
                          ) : item.nutriScore === "e" ||
                            item.ecoscore === "e" ? (
                            <View style={styles.grade}>
                              <FontAwesome
                                name="circle"
                                size={24}
                                color="#D50506"
                              />
                              <View style={styles.note}>
                                <Text>Mauvais</Text>
                              </View>
                            </View>
                          ) : item.nutriScore === "no_value" ||
                            item.ecoscore === undefined ? (
                            <View style={styles.grade}>
                              <FontAwesome
                                name="circle"
                                size={24}
                                color="#D1D1D1"
                              />
                              <Text style={styles.note}>
                                Pas de nutriscore pour ce produit pour l'instant
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
        ) : (
          <View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image source={carott} style={{ width: 100, height: 100 }} />
              <Text
                style={{
                  color: "#474747",
                  textShadowColor: "white",
                  textShadowOffset: { width: -1, height: 0 },
                  textShadowRadius: 10,
                  fontSize: 50,
                }}
              >
                Historique
              </Text>
              <Text
                style={{
                  color: "green",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                Commencer à scanner vos produits préférés
              </Text>
            </View>
            <Image
              source={{
                uri:
                  "https://media.giphy.com/media/jQKI4boQ0gE62vKrEC/giphy.gif",
              }}
              style={{ width: 550, height: 300, marginTop: 300 }}
            ></Image>
          </View>
        )}
      </ScrollView>
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
    marginTop: Platform.OS === "android" ? 550 : 650,
    right: 20,
  },
  text: { fontSize: 18 },
  home: {
    backgroundColor: "#F5C791",
    flex: 1,
  },
});
