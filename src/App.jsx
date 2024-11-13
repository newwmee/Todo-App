import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", isDone: false },
    { id: 1, content: "코딩 공부하기", isDone: false },
    { id: 2, content: "잠 자기", isDone: false },
  ]);

  return (
    <>
      <h1>TODO-LIST📝</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function ModifyValue({ inputValue, setInputValue }) {
  return (
    <input
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 아닌지

  return (
    <li>
      {todo.isDone ? <s>{todo.content}</s> : todo.content}
      {!isEditing ? null : (
        <ModifyValue inputValue={inputValue} setInputValue={setInputValue} />
      )}
      <button
        onClick={() => {
          if (isEditing) {
            // 수정 중이라면
            setTodoList((prev) =>
              prev.map((el) =>
                el.id === todo.id ? { ...el, content: inputValue } : el
              )
            );

            // 수정 끝
            setIsEditing(false);
          } else {
            setInputValue(todo.content);
            setIsEditing(true); // 수정 모드 활성화
          }
        }}
      >
        {isEditing ? "저장" : "수정"}
      </button>
      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
      <button
        onClick={() => {
          setTodoList((prev) => {
            // 상태 먼저 업데이트
            const updatedTodos = prev.map((el) =>
              el.id === todo.id ? { ...el, isDone: !el.isDone } : el
            );

            // 완료되지 않은 항목 (isDone이 false인 항목)
            const incompleteTodos = updatedTodos.filter(
              (el) => el.isDone === false
            );

            // 완료된 항목 (isDone이 true인 항목)
            const completeTodos = updatedTodos.filter(
              (el) => el.isDone === true
            );

            // 완료되지 않은 항목을 먼저, 완료된 항목을 뒤에 배치
            return [...incompleteTodos, ...completeTodos];
          });
        }}
      >
        {todo.isDone ? "취소" : "완료"}
      </button>
    </li>
  );
}

export default App;
