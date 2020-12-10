import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, ActivityIndicator } from "react-native";

export default function FavoritesScreen() {
  const navigation = useNavigation();
  return <ActivityIndicator />;
}
