import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const TodoScreen = ({ goBack, todo }) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Back" onPress={goBack} color={"#757575"} />
        </View>
        <View style={styles.button}>
          <Button
            title="Delete"
            color={"#e53935"}
            onPress={() => console.log("remove")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: { width: "45%" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default TodoScreen;
