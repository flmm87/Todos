import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useTodoContext } from "../store/todoContext";
import TodosList from "./TodosList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const TodoHome = (): JSX.Element => {
  const { todoObject, setTodoObject } = useTodoContext();
  const router = useRouter();

  useEffect(() => {
    const todoFromLocalStore = async () => {
      try {
        const value = await AsyncStorage.getItem("todo");
        if (value !== null) {
          setTodoObject(JSON.parse(value));
        }
      } catch (e) {
        console.error(e);
      }
    };
    todoFromLocalStore();
  }, []);

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        {todoObject.length > 0 ? (
          <TodosList data={todoObject} />
        ) : (
          <View style={styles.mainContainer}>
            <Text style={styles.text}>Please add your first Todo</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.navigate("modalForm")}
        >
          <Icon name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TodoHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
