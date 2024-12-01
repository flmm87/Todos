import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { useTodoContext } from "../store/todoContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export interface todoFormat {
  todo: string;
  id?: number;
  complete: boolean;
}

const TodosList = ({ data }) => {
  const { confirmTodo, deleteTodo } = useTodoContext();
  const router = useRouter();

  function toggleComplete(id: number) {
    confirmTodo(id);
  }

  function renderList({ item }: { item: todoFormat }) {
    return (
      <View style={styles.rootContainer}>
        <View
          style={[
            styles.newsContainer,
            styles.shadowContainer,
            item.complete
              ? { backgroundColor: "lightgreen" }
              : { backgroundColor: "#fff" },
          ]}
        >
          <Text style={styles.newsStyle}>{item.todo}</Text>
        </View>

        <View>
          <View style={styles.checkBtnConteiner}>
            <Checkbox
              value={item.complete}
              onValueChange={() => toggleComplete(item.id)}
              color="black"
              style={styles.checkbox}
            />
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Icon name="trash" style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <>
      <SafeAreaView />
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderList}
          style={styles.styleFlatList}
        />
        <View style={{ flex: 1, alignItems: "center", paddingVertical: 15 }}>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => router.navigate("modalForm")}
          >
            <Icon name="plus" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TodosList;

const styles = StyleSheet.create({
  styleFlatList: {
    padding: 8,
    height: "80%",
  },
  newsStyle: {
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  newsContainer: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    width: "80%",
  },
  rootContainer: {
    flex: 1,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shadowContainer: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  checkBtnConteiner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  trashIcon: {
    fontSize: 25,
  },
  checkbox: {
    borderRadius: 10,
  },

  plusBtn: {
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    flexDirection: "column",
  },
});
