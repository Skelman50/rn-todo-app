import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { THEME } from "../theme";
import AppCard from "../components/ui/AppCard";
import EditModal from "../components/EditModal";
import AppTextBold from "../components/ui/AppTextBold";

const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);
  const cancelModal = () => {
    setModal(false);
  };

  const saveHandler = title => {
    onSave(todo.id, title);
    setModal(false);
  };
  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={cancelModal}
        value={todo.title}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <Button title={"Edit"} onPress={() => setModal(true)} />
      </AppCard>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button title="Back" onPress={goBack} color={THEME.GREY_COLOR} />
        </View>
        <View style={styles.button}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
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
  },
  title: { fontSize: 20 },
  card: { marginBottom: 20, padding: 15 }
});

export default TodoScreen;
