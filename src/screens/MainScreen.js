import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
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
      <FlatList
        style={styles.flatlist}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
        )}
        keyExtractor={item => item.id}
      />
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
