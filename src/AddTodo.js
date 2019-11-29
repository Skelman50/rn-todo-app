import React from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

export const AddTodo = () => {
  return (
    <View style={styles.block}>
      <TextInput style={styles.input} />
      <Button title="Add" />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    width: "85%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "black"
  }
});
