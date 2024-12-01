import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useTodoContext } from "../store/todoContext";

const ModalForm = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>();
  const { addTodo } = useTodoContext();

  const handleSubmitInput = () => {
    if (inputValue) {
      addTodo(inputValue);
      setInputValue("");
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Insert Todo</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={() => router.back()} color="black" />
          <Button title="Submit" onPress={handleSubmitInput} color="black" />
        </View>
      </View>
    </View>
  );
};

export default ModalForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align modal at the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modal: {
    height: "70%", // Set the modal height to half the screen
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  textInputContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    paddingVertical: 25,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 40,
    borderRadius: 15,
  },
  text: {
    color: "#black",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  btnstyle: {
    color: "black",
  },
});
