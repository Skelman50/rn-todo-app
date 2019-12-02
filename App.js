import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Navbar } from "./src/components/Navbar";
import MainScreen from "./src/screens/MainScreen";
import TodoScreen from "./src/screens/TodoScreen";

async function loadApp() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf")
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const addTodo = title => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  const removeTodo = id => {
    const todo = todos.find(todo => id === todo.id);
    Alert.alert(
      "Удаление элементов",
      `Вы уверены что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setTodoId(null);
            setTodos(prevTodos => {
              return prevTodos.filter(todo => todo.id !== id);
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (id, title) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            title,
            id
          };
        } else {
          return todo;
        }
      })
    );
  };

  const content = () => {
    if (todoId) {
      const todo = todos.find(todo => todoId === todo.id);
      return (
        <TodoScreen
          id={todoId}
          goBack={() => setTodoId(null)}
          todo={todo}
          onRemove={removeTodo}
          onSave={updateTodo}
        />
      );
    }
    return (
      <MainScreen
        removeTodo={removeTodo}
        todos={todos}
        addTodo={addTodo}
        openTodo={setTodoId}
      />
    );
  };

  return (
    <View>
      <Navbar title={"Todo App!"} />
      <View style={styles.container}>{content()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
