import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Http } from "../../http";

const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: true,
    error: null
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);
  const addTodo = async title => {
    try {
      const data = await Http.post(
        "https://rn-todo-app-8fb95.firebaseio.com/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (error) {
      showError("Something went wrong");
    }
  };
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
          onPress: async () => {
            try {
              await Http.delete(
                `https://rn-todo-app-8fb95.firebaseio.com/todos/${id}.json`
              );
            } catch (error) {
              showError("Something went wrong");
            }
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const fetchTodos = async () => {
    try {
      clearError();
      showLoader();
      const data = await Http.get(
        "https://rn-todo-app-8fb95.firebaseio.com/todos.json"
      );
      const todos = data
        ? Object.keys(data).map(key => ({ ...data[key], id: key }))
        : [];
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError("Что-то пошло не так...");
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    try {
      await Http.patch(
        `https://rn-todo-app-8fb95.firebaseio.com/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError("Что-то пошло не так...");
    }
  };

  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        ...state,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        loading: state.loading,
        error: state.error
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
