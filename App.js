import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import MainScreen from "./src/screens/MainScreen";
import TodoScreen from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState("1");
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "Забрать пілесос"
    }
  ]);

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
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
  };

  const content = () => {
    if (todoId) {
      const todo = todos.find(todo => todoId === todo.id);
      return (
        <TodoScreen id={todoId} goBack={() => setTodoId(null)} todo={todo} />
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
