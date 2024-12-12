import { Stack, useRouter } from "expo-router";
import React from "react";
import { Button, StatusBar } from "react-native";
import { TodoProvider } from "../store/todoContext";

const StackLayout = () => {
  return (
    <TodoProvider>
      <StatusBar backgroundColor="dark" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="todoHome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="modalForm"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </TodoProvider>
  );
};

export default StackLayout;
