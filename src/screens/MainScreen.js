import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import AppLoader from "../components/ui/AppLoader";
import AppText from "../components/ui/AppText";
import AppButton from "../components/ui/AppButton";

const MainScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );

  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );

  const { changeScreen } = useContext(ScreenContext);

  const loadTodos = useCallback(async () => {
    await fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

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
      <View style={{ width: deviceWidth, height: "90%" }}>
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

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content()}
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    height: "100%",
    paddingTop: 15,
    paddingBottom: 15
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
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    fontSize: 20,
    color: "red"
  }
});

export default MainScreen;
