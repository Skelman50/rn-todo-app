import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

const MainScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const { addTodo, todos, removeTodo } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);
    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  const content = () => {
    if (!todos.length) {
      return (
        <View style={styles.imageWrapper}>
          <Image
            source={require("../../assets/no-items.png")}
            style={styles.image}
          />
        </View>
      );
    }
    return (
      <View style={{ width: deviceWidth }}>
        <FlatList
          style={styles.flatlist}
          data={todos}
          renderItem={({ item }) => (
            <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content()}
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    height: "80%",
    paddingTop: 15
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});

export default MainScreen;
