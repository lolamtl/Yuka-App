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
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
