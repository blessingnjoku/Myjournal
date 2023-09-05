import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "./constants/Colors";

const JournalContentBox = ({ item, onPress}) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text numberOfLines={2} style={styles.Title}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRI,
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
  },
  Title: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.LIGHT,
  
  },
});

export default JournalContentBox;
