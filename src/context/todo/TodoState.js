import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";
import { ScreenContext } from "../screen/screenContext";

const TodoState = ({ children }) => {
  const initialState = {
    todos: [{ id: "1", title: "Выучить Johnny Five" }]
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);
  const addTodo = title => dispatch({ type: ADD_TODO, title });
  const removeTodo = id => {
    const todo = state.todos.find(todo => todo.id === id);
    Alert.alert(
      "Удаление элементов",
      `Вы уверены что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Cancel"
        },
        {
          text: "OK",
          onPress: () => {
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });
  return (
    <TodoContext.Provider value={{ ...state, addTodo, removeTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
