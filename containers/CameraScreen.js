import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, StyleSheet, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

export default function CameraScreen(props) {
  const { setCode } = props;
  // const [isLoading, setIsLoading]=useState(true);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  // console.log(props);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      // BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    askPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setCode(data);
    navigation.navigate("Product", { code: data });

    alert(
      `Bar code with type ${type} and data ${data} has been scanned succesfully!`
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const flashoff =
    setFlash === Camera.Constants.FlashMode.off
      ? require("../assets/flash-light.png")
      : require("../assets/Flashlight.png");

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        FlashMode={flash}
      >
        <View>
          <TouchableOpacity
            style={styles.flashcontainer}
            onPress={() => {
              setFlash({
                flashoff:
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off,
              });
            }}
          >
            <Image style={{ width: 50, height: 50 }} source={flashoff} />
          </TouchableOpacity>
          {/* <Entypo name="flashlight" size={24} color="black" /> */}
        </View>
      </BarCodeScanner>

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  flashcontainer: {
    // position: "absolute",
    top: 10,
    left: 10,
  },
});
