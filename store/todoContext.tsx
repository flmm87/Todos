import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { todoFormat } from "../components/TodosList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface TodoContextType {
  todoObject: todoFormat[];
  addTodo: (todo: string, id?: number) => void;
  deleteTodo: (id: number) => void;
  confirmTodo: (id: number) => void;
  setTodoObject: (todos: todoFormat[]) => void;
  editTodo: (id: number, newTodo: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoObject, setTodoObject] = useState<todoFormat[]>([]);

  useEffect(() => {
    async function saveToLocalStorage() {
      try {
        // only save in there's is todo
        if (todoObject.length > 0)
          await AsyncStorage.setItem("todo", JSON.stringify(todoObject));
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error);
      }
    }
    saveToLocalStorage();
  }, [todoObject]);

  const addTodo = (todo: string): void => {
    setTodoObject((prevTodos) => [
      ...prevTodos,
      {
        id: prevTodos.todo.lenght,
        todo,
        complete: false,
      },
    ]);
  };

  const editTodo = (id: number, newTodo: string): void => {
    setTodoObject((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: newTodo } : todo
      )
    );
  };

  const deleteTodo = async (id: number): Promise<void> => {
    setTodoObject((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    await AsyncStorage.clear();
  };

  const confirmTodo = (id: number): void => {
    setTodoObject((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todoObject,
        addTodo,
        deleteTodo,
        confirmTodo,
        setTodoObject,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
