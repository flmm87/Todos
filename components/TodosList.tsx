import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { useTodoContext } from "../store/todoContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export interface todoFormat {
  todo: string;
  id?: number;
  complete: boolean;
}

const TodosList = ({ data }): JSX.Element => {
  const { confirmTodo, deleteTodo } = useTodoContext();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  // Search and Filter Todos

  const filteredData = data.filter((todo: todoFormat) => {
    const matchedData = todo.todo
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const filterData =
      filter === "all" ||
      (filter === "complete" && todo.complete) ||
      (filter === "incomplete" && !todo.complete);

    return filterData && matchedData;
  });

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

        <View style={{ flex: 1 }}>
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
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/modalForm",
                  params: { id: item.id, todo: item.todo },
                });
              }}
            >
              <Icon name="pencil" style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <>
      <SafeAreaView />
      <View style={{ paddingHorizontal: 10, paddingTop: 80 }}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search todos..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.activeFilter,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "complete" && styles.activeFilter,
            ]}
            onPress={() => setFilter("complete")}
          >
            <Text>Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "incomplete" && styles.activeFilter,
            ]}
            onPress={() => setFilter("incomplete")}
          >
            <Text>Incomplete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderList}
          style={styles.styleFlatList}
        />
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
    width: "79%",
  },
  rootContainer: {
    flex: 1,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "92%",
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
    justifyContent: "space-around",
    gap: 12,
    padding: 10,
  },

  trashIcon: {
    fontSize: 20,
  },
  checkbox: {
    borderRadius: 30,
  },

  plusBtn: {
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    flexDirection: "column",
  },
  searchInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  activeFilter: {
    backgroundColor: "lightgray",
  },
});
