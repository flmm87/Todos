import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const index = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Welcome in your Todo App</Text>
      <Link href="todoHome">
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.plusIcon]}>
            <Icon name="arrow-right" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  plusIcon: {
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: "400",
  },
});
