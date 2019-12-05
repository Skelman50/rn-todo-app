import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import TodoScreen from "./screens/TodoScreen";
import MainScreen from "./screens/MainScreen";
import { ScreenContext } from "./context/screen/screenContext";

const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  //   const removeTodo = id => {
  //     const todo = todos.find(todo => id === todo.id);
  //     Alert.alert(
  //       "Удаление элементов",
  //       `Вы уверены что хотите удалить "${todo.title}"?`,
  //       [
  //         {
  //           text: "Cancel"
  //         },
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             setTodoId(null);
  //             setTodos(prevTodos => {
  //               return prevTodos.filter(todo => todo.id !== id);
  //             });
  //           }
  //         }
  //       ],
  //       { cancelable: false }
  //     );
  //   };

  return (
    <View>
      <Navbar title={"Todo App!"} />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
});

export default MainLayout;
