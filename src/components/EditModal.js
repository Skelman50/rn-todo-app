import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  TextInput,
  Button,
  Alert
} from "react-native";
import { THEME } from "../theme";
import AppButton from "./ui/AppButton";

const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (!title.trim().length) {
      Alert.alert("Empty input");
    } else {
      onSave(title);
    }
  };

  const cancelHandler = () => {
    setTitle(value);
    onCancel();
  };
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder="Add title"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%"
  },
  buttons: {
    width: "80%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default EditModal;
