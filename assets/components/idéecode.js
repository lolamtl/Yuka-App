
          <Text>{data.product.product_name_en}</Text>
          <Text style={styles.text}>{data.product_name}</Text>

          <Text>{data.product.brands}</Text>
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
            ) : data.product.nutrition_grade_fr === "b" ? (
              <View>
                <FontAwesome name="circle" size={24} color="#5DCC71" />
                <Text>Trés bon</Text>
              </View>
            ) : data.product.nutrition_grade_fr === "c" ? (
              <View>
                <FontAwesome name="circle" size={24} color="yellow" />
                <Text>Bon</Text>
              </View>
            ) : data.product.nutrition_grade_fr === "d" ? (
              <View>
                <FontAwesome name="circle" size={24} color="orange" />
                <Text>Médiocre</Text>
              </View>
            ) : data.product.nutrition_grade_fr === "e" ? (
              <View>
                <FontAwesome name="circle" size={24} color="#D50506" />
                <Text>Mauvais</Text>
              </View>
            ) : (
              <Text> NO grade</Text>
            )}
          </View>
          <Entypo name="back-in-time" size={24} color="black" />