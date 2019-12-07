import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Keyboard, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("The string can't be an empty");
    }
  };
  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Add todo"
        autoCorrect={false}
      />
      <AntDesign.Button onPress={pressHandler} name="pluscircleo">
        Add
      </AntDesign.Button>
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
    width: "75%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});
