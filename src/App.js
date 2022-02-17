import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import React, { useCallback, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [btnDisabled, setBtnDisabled] = useState();
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const localTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (localTodoList) {
      setTodoList(JSON.parse(localTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const handleOnChange = useCallback((text) => {
    setBtnDisabled(text.target.value);
    setTextInput(text.target.value);
  }, []);

  const handleOnClick = useCallback(
    (e) => {
      setTodoList([
        { id: v4(), name: textInput, isComplated: false },
        ...todoList,
      ]);
      setTextInput("");
    },
    [textInput, todoList]
  );

  const handleCheckClick = useCallback((id) => {
    if (
      window.confirm(
        "Việc đã thực hiện xong, bạn có muốn xoá việc cần làm này không ?"
      )
    )
      setTodoList((prevState) => prevState.filter((todo) => todo.id !== id));
  }, []);
  return (
    <div>
      <h3>Danh sách công việc cần làm:</h3>
      <Textfield
        name="add-todo"
        placeholder="Nhập vào công việc cần làm..."
        value={textInput}
        onChange={handleOnChange}
        elemAfterInput={
          <Button
            isDisabled={!btnDisabled}
            appearance="primary"
            onClick={handleOnClick}
          >
            Thêm
          </Button>
        }
      ></Textfield>
      <TodoList todoList={todoList} handleCheckClick={handleCheckClick} />
    </div>
  );
}

export default App;
