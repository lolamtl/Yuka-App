import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { color, log } from "react-native-reanimated";

export default function ProductScreen(props) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [newProduct, setNewProduct] = useState({});
  const { params } = useRoute();
  // const { product, setProduct } = props;

  const saveTheProduct = async (newobject) => {
    const saveCode = await AsyncStorage.getItem("pdt");
    if (saveCode !== null) {
      const saveObject = JSON.parse(saveCode);

      let theId = null;
      for (let i = 0; i < saveObject.length; i++) {
        if (saveObject[i].id === newobject.product._id) {
          theId = i;
        }
      }
      if (theId === null) {
        const saveProd = {
          id: newobject.product._id,
          brand: newobject.product.brands,
          name: newobject.product.product_name,
          image: newobject.product.image_url,
          ecoscore: newobject.product.ecoscore_grade,
          nutriScore: newobject.product.nutrition_grade_fr,
          note: newobject.product.nutriscore_score,
          favorite: false,
        };

        saveObject.push(saveProd);
        let store = JSON.stringify(saveObject);
        await AsyncStorage.setItem("pdt", store);
        setNewProduct(saveProd);
      } else {
        setNewProduct(saveObject[theId]);
      }
    } else {
      let tab = [];
      const saveProd = {
        id: newobject.product._id,
        brand: newobject.product.brands,
        name: newobject.product.product_name,
        image: newobject.product.image_url,
        ecoscore: newobject.product.ecoscore_grade,
        nutriScore: newobject.product.nutrition_grade_fr,
        note: newobject.product.nutriscore_score,
        favorite: false,
      };
      tab.push(saveProd);
      let stringArray = JSON.stringify(tab);
      await AsyncStorage.setItem("pdt", stringArray);
      setNewProduct(saveProd);
    }
  };

  // const code = props.route.params.code;
  // console.log(
  //   "LOOK HERE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
  // );
  // console.log(props.route.params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "https://world.openfoodfacts.org/api/v0/product/3259010108047.json"
          `https://world.openfoodfacts.org/api/v0/product/${props.route.params.code}.json`
        );

        if (response.data) {
          setData(response.data);
          saveTheProduct(response.data);
          setIsLoading(false);
          // await AsyncStorage.setItem("code", code);
        } else {
          alert("Ca marche pas!");
        }
        console.log("loook HERREEEEEEEEE --------------->");
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  console.log("NEWPRODUCT", newProduct);

  return isLoading ? (
    <View>
      <ActivityIndicator
        size="large"
        color="#FF9100"
        style={{ paddingTop: 30 }}
      />
    </View>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={styles.view}>
            {/* --------------------- PRODUITS INFOS ------------------> */}
            <View>
              <Image
                style={{ height: 150, width: 100, borderRadius: 10 }}
                source={{ uri: data.product.image_url }}
              />
            </View>
            <View style={styles.infos}>
              <View style={styles.favoris}>
                <Text style={styles.text}>{data.product.product_name}</Text>
              </View>
              <Text>{data.product.brands}</Text>
              <View>
                <View style={styles.grade}>
                  {data.product.nutrition_grade_fr === "a" ||
                  data.product.ecoscore_grade === "a" ? (
                    <View style={styles.grade}>
                      <FontAwesome name="circle" size={24} color="green" />
                      <View style={styles.note}>
                        <Text style={styles.score}>
                          {data.product.nutriscore_score}/100
                          <Text>(A REVOIR)</Text>
                        </Text>
                        <Text>Excellent!</Text>
                      </View>
                    </View>
                  ) : data.product.nutrition_grade_fr === "b" ||
                    data.product.ecoscore_grade === "b" ? (
                    <View style={styles.grade}>
                      <FontAwesome name="circle" size={24} color="#5DCC71" />
                      <View style={styles.note}>
                        <Text style={styles.score}>
                          {data.product.nutriscore_score ||
                            data.product.ecoscore_score}
                          /100
                          <Text>(A REVOIR)</Text>
                        </Text>
                        <Text>Trés bon</Text>
                      </View>
                    </View>
                  ) : data.product.nutrition_grade_fr === "c" ||
                    data.product.ecoscore_grade === "c" ? (
                    <View style={styles.grade}>
                      <FontAwesome name="circle" size={24} color="yellow" />
                      <View style={styles.note}>
                        <Text style={styles.score}>
                          {data.product.nutriscore_score.toFixed(2) ||
                            data.product.ecoscore_score}
                          /100
                          <Text>(A REVOIR)</Text>
                        </Text>
                        <Text>Bon</Text>
                      </View>
                    </View>
                  ) : data.product.nutrition_grade_fr === "d" ||
                    data.product.ecoscore_grade === "d" ? (
                    <View style={styles.grade}>
                      <FontAwesome name="circle" size={24} color="orange" />
                      <View style={styles.note}>
                        <Text style={styles.score}>
                          {data.product.nutriscore_score}/100
                          <Text>(A REVOIR)</Text>
                        </Text>
                        <Text>Médiocre</Text>
                      </View>
                    </View>
                  ) : data.product.nutrition_grade_fr === "e" ||
                    data.product.ecoscore_grade === "e" ? (
                    <View style={styles.grade}>
                      <FontAwesome name="circle" size={24} color="#D50506" />
                      <View style={styles.note}>
                        <Text style={styles.score}>
                          {data.product.nutriscore_score}/100
                          <Text>(A REVOIR)</Text>
                        </Text>
                        <Text>Mauvais</Text>
                      </View>
                    </View>
                  ) : data.product.nutrition_grade_fr === "no_value" ||
                    data.product.nutrition_grade_fr === undefined ? (
                    <View>
                      <FontAwesome name="circle" size={24} color="#D1D1D1" />
                      <Text>Pas de note pour ce produit pour l'instant</Text>
                    </View>
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    const productFavo = await AsyncStorage.getItem("pdt");
                    if (productFavo !== null) {
                      const productArray = JSON.parse(productFavo);

                      for (let i = 0; i < productArray.length; i++) {
                        if (productArray[i].id === data.product.id) {
                          productArray[i].favorite = !productArray[i].favorite;
                        }
                      }
                      await AsyncStorage.setItem(
                        "pdt",
                        JSON.stringify(productArray)
                      );
                    }
                    setNewProduct({
                      ...newProduct,
                      favorite: !newProduct.favorite,
                    });
                  }}
                  // style={styles.star}
                >
                  {newProduct.favorite ? (
                    <View style={styles.star}>
                      <AntDesign size={30} name="star" color="gold" />
                      <Text>Retirer des favoris</Text>
                    </View>
                  ) : (
                    <View style={styles.star}>
                      <AntDesign size={30} name="staro" color="gold" />
                      <Text>Ajouter aux favoris</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ----------------------------- QUALITES PDT -----------------------> */}
          <View style={styles.description}>
            <View style={styles.quality}>
              <View>
                <Text style={styles.qualité}>Qualités</Text>
              </View>
              <View>
                <Text>pour 100g</Text>
              </View>
            </View>
            {/* ================== BIO ? -------------------> */}
            {data.product.labels_tags[0] === "en:organic" ? (
              <View style={styles.quality} alignItems="center">
                <View style={styles.leaf}>
                  <Entypo name="leaf" size={24} color="black" />
                  <View style={styles.textplus}>
                    <Text style={styles.text}>Bio</Text>
                    <Text>Produit naturel</Text>
                  </View>
                </View>
                <AntDesign name="check" size={24} color="#5DCC71" />
              </View>
            ) : null}
            <View style={styles.sndview} />

            {/* ========================= PROTEINES ====================== */}
            <View style={styles.flex}>
              {data.product.nutriments.proteins_100g === 0 ? null : data.product
                  .nutriments.proteins_100g < 8 ? (
                <View>
                  <View style={styles.leaf}>
                    <FontAwesome5 name="fish" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Protéines</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Quelques Protéines</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.proteins_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="#5DCC71"
                      />
                      <TouchableOpacity onChange={"hellooooo"}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.proteins_100g >= 8 ? (
                <View>
                  <View style={styles.leaf}>
                    <FontAwesome5 name="fish" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Protéines</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Excellente quantité de protéines</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.proteins_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
            {/* ========================= FIBRES ===================== */}
            <View style={styles.flex}>
              {data.product.nutriments.fiber_100g === 0 ? null : data.product
                  .nutriments.fiber_100g < 3.5 ? (
                <View>
                  <View style={styles.leaf}>
                    <Fontisto name="sourcetree" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Fibres</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Quelques fibres</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.fiber_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="#5DCC71"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.fiber_100g >= 3.5 ? (
                <View>
                  <View style={styles.leaf}>
                    <Fontisto name="sourcetree" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Fibres</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Excellente quantité de fibres</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.fiber_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
            {/* =============================== CALORIES ========================= */}
            <View style={styles.flex}>
              {data.product.nutriments.energy_value < 160 ? (
                <View>
                  <View style={styles.leaf}>
                    <Octicons name="flame" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Calories</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Peu calorique</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.energy_value.toFixed(2)} kCal
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.energy_value >= 160 &&
                data.product.nutriments.energy_value <= 360 ? (
                <View>
                  <View style={styles.leaf}>
                    <Octicons name="flame" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Calories</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Faible impact</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.energy_value.toFixed(2)} kCal
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="#5DCC71"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
            {/* ========================== GRAISSES SATUREES ====================== */}
            <View style={styles.flex}>
              {data.product.nutriments["saturated-fat_value"] === 0 ? (
                <View>
                  <View style={styles.leaf}>
                    <Ionicons name="ios-water" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Graisses saturées</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Pas de graisses sat.</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments["saturated-fat_value"].toFixed(
                          2
                        )}
                        g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments["saturated-fat_value"] < 2 ? (
                <View>
                  <View style={styles.leaf}>
                    <Ionicons name="ios-water" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Graisses saturées</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Peu de graisses sat.</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments["saturated-fat_value"].toFixed(
                          2
                        )}
                        g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments["saturated-fat_value"] >= 2 &&
                data.product.nutriments["saturated-fat_value"] < 4 ? (
                <View>
                  <View style={styles.leaf}>
                    <Ionicons name="ios-water" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Graisses saturées</Text>
                    </View>
                  </View>
                  <View style={styles.dispatch}>
                    <View style={styles.grammes}>
                      <Text>Faible impact</Text>
                    </View>
                    <View style={styles.grammes}>
                      <Text style={styles.texte}>
                        {data.product.nutriments["saturated-fat_value"].toFixed(
                          2
                        )}
                        g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="#5DCC71"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.sndview} />
                  </View>
                </View>
              ) : null}
            </View>
            {/* ==================================== SUCRE ================================= */}
            <View style={styles.flex}>
              {data.product.nutriments.sugars_100g === 0 ? (
                <View>
                  <View style={styles.leaf}>
                    <FontAwesome name="cubes" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sucre</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Pas de sucre</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.sugars_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.sugars_100g < 9 ? (
                <View>
                  <View style={styles.leaf}>
                    <FontAwesome name="cubes" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sucre</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Peu de sucre</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.sugars_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.sugars_100g >= 9 &&
                data.product.nutriments.sugars_100g < 18 ? (
                <View>
                  <View style={styles.leaf}>
                    <FontAwesome name="cubes" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sucre</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Faible impact</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.sugars_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="#5DCC71"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
            {/* ========================================== SEL =================================== */}
            <View style={styles.flex}>
              {data.product.nutriments.salt_100g === 0 ? (
                <View>
                  <View style={styles.leaf}>
                    <AntDesign name="dotchart" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sel</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Pas de sel</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.salt_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.salt_100g < 0.46 ? (
                <View>
                  <View style={styles.leaf}>
                    <AntDesign name="dotchart" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sel</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Peu de sel</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.salt_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="green"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.salt_100g >= 0.46 &&
                data.product.nutriments.salt_100g < 0.92 ? (
                <View>
                  <View style={styles.leaf}>
                    <AntDesign name="dotchart" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sel</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Faible impact</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.salt_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="#5DCC71"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
          </View>
          {/* ++++++++++++++++++++++++++++++++++++++++++++++++DEFAUTS++++++++++++++++++++++++++++++++++++++++++++++++ */}

          <View style={styles.description}>
            <View style={styles.quality}>
              <View>
                <Text style={styles.qualité}>Défauts</Text>
              </View>
              <View>
                <Text>pour 100g</Text>
              </View>
            </View>

            {/* =============================== CALORIES ========================= */}
            <View style={styles.flex}>
              {data.product.nutriments["energy-kcal_100g"] > 360 &&
              data.product.nutriments["energy-kcal_100g"] < 560 ? (
                <View>
                  <View style={styles.leaf}>
                    <Octicons name="flame" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Calories</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Un peu trop calorique</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments["energy-kcal_100g"].toFixed(
                          2
                        ) || data.product.nutriments.energy_value.toFixed(2)}
                        kCal
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="orange"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments["energy-kcal_100g"] >= 560 ? (
                <View>
                  <View style={styles.leaf}>
                    <Octicons name="flame" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Calories</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Trop calorique</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments["energy-kcal_100g"].toFixed(
                          2
                        ) || data.product.nutriments.energy_value.toFixed(2)}
                        kCal
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="red"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
            {/* ========================== GRAISSES SATUREES ====================== */}
            <View style={styles.flex}>
              {data.product.nutriments["saturated-fat_value"] > 4 &&
              data.product.nutriments["saturated-fat_value"] < 7 ? (
                <View>
                  <View style={styles.leaf}>
                    <Ionicons name="ios-water" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Graisses saturées</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Un peu trop gras</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments["saturated-fat_value"].toFixed(
                          2
                        )}
                        g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="orange"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments["saturated-fat_value"] >= 7 ? (
                <View>
                  <View style={styles.leaf}>
                    <Ionicons name="ios-water" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Graisses saturées</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Trop gras</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments["saturated-fat_value"].toFixed(
                          2
                        )}
                        g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="red"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
            {/* ==================================== SUCRE ================================= */}
            <View style={styles.flex}>
              {data.product.nutriments.sugars_100g > 18 &&
              data.product.nutriments.sugars_100g < 31 ? (
                <View>
                  <View style={styles.leaf}>
                    <FontAwesome name="cubes" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sucre</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Un peu trop de sucre</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.sugars_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="orange"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.sugars_100g >= 31 ? (
                <View>
                  <View style={styles.leaf}>
                    <FontAwesome name="cubes" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sucre</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Trop sucré</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.sugars_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="red"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
            {/* ========================================== SEL =================================== */}
            <View style={styles.flex}>
              {data.product.nutriments.salt_100g > 0.92 &&
              data.product.nutriments.salt_100g < 1.62 ? (
                <View>
                  <View style={styles.leaf}>
                    <AntDesign name="dotchart" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sel</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Un peu trop salé</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.salt_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="orange"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : data.product.nutriments.salt_100g > 1.62 ? (
                <View>
                  <View style={styles.leaf}>
                    <AntDesign name="dotchart" size={24} color="black" />
                    <View style={styles.textplus}>
                      <Text style={styles.text}>Sel</Text>
                    </View>
                  </View>
                  <View style={styles.grammes}>
                    <View style={styles.dispatch}>
                      <Text>Trop salé</Text>
                    </View>
                    <View style={styles.direction}>
                      <Text style={styles.texte}>
                        {data.product.nutriments.salt_100g.toFixed(2)} g
                      </Text>
                      <FontAwesome
                        style={styles.texte}
                        name="circle"
                        size={24}
                        color="red"
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.sndview} />
                </View>
              ) : null}
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  quality: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qualité: {
    fontSize: 15,
    fontWeight: "bold",
  },

  button: {
    position: "absolute",
    backgroundColor: "yellow",
  },
  text: { fontSize: 17, fontWeight: "bold" },

  leaf: {
    // flex: 1,
    marginRight: 20,
    marginTop: 20,
    flexDirection: "row",
    // backgroundColor: "yellow",
    alignItems: "center",
  },
  textplus: {
    marginLeft: 10,
  },
  sndview: {
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#EBEBEB",
  },
  grammes: {
    justifyContent: "space-between",
    // flex: 1,
    flexDirection: "row",
    // marginLeft: 33,
    alignItems: "center",
    // backgroundColor: "red",
  },
  dispatch: {
    // flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  texte: {
    marginRight: 10,
  },
  espace: {
    // marginLeft: 20,
  },
  flex: {
    // flex: 1,
    // backgroundColor: "orange",
  },
  direction: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoris: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  star: {
    alignItems: "center",
  },
});
