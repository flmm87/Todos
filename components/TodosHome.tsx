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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {todoObject.length > 0 ? (
          <View>
            <TodosList data={todoObject} />
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <Text style={styles.text}>Please add your first Todo</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => router.navigate("modalForm")}
              >
                <Icon name="plus" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default TodoHome;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  iconContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    flexDirection: "column",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
  },
});
