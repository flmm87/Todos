import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { todoFormat } from "../components/TodosList";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TodoContextType {
  todoObject: todoFormat[];
  addTodo: (todo: string) => void;
  deleteTodo: (id: number) => void;
  confirmTodo: (id: number) => void;
  setTodoObject: (todos: todoFormat[]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoObject, setTodoObject] = useState<todoFormat[]>([]);

  useEffect(() => {
    async function saveToLocalStorage() {
      // only save in there's is todo
      if (todoObject.length > 0)
        await AsyncStorage.setItem("todo", JSON.stringify(todoObject));
    }
    saveToLocalStorage();
  }, [todoObject]);

  const addTodo = (todo: string): void => {
    setTodoObject((prevTodos) => [
      ...prevTodos,
      {
        id: prevTodos.length + 1,
        todo,
        complete: false,
      },
    ]);
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
