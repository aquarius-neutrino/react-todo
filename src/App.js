import { useState,useEffect  } from 'react';
import './App.css';
function App() {
  // 从本地读取数据（刷新不消失）
  const getLocalTodos = () => {
    const local = localStorage.getItem('todos');
    return local ? JSON.parse(local) : [];
  };

  // 输入框内容
  const [inputText, setInputText] = useState('');
  // 任务列表
  const [todoList, setTodoList] = useState(getLocalTodos);
  // 编辑列表
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // 保存到本地
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);
  // 添加任务
  const addTodo = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setTodoList([
      ...todoList,
      { id: Date.now(), text: inputText, completed: false }
    ]);
    setInputText('');
  };
  // 切换完成/未完成
  const toggleComplete = (id) => {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 删除任务
  const deleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  // 开始编辑
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  // 保存编辑
  const saveEdit = (id) => {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
  };

  // 清空全部
  const clearAll = () => {
    setTodoList([]);
  };

  return (
        <div className="app">
      <div className="container">
        <h1>我的代办清单 ✅</h1>

        {/* 添加表单 */}
        <form onSubmit={addTodo} className="input-form">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入新任务..."
          />
          <button type="submit">添加</button>
        </form>

        {/* 任务列表 */}
        <div className="todo-list">
          {todoList.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              {/* 编辑状态 */}
              {editId === todo.id ? (
                <div className="edit-row">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(todo.id)}>保存</button>
                </div>
              ) : (
                <div className="todo-row">
                  <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
                    {todo.text}
                  </div>
                  <div className="btn-group">
                    <button onClick={() => startEdit(todo)}>编辑</button>
                    <button className="delete" onClick={() => deleteTodo(todo.id)}>删除</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 清空按钮 */}
        {todoList.length > 0 && (
          <button className="clear-all" onClick={clearAll}>
            清空全部任务
          </button>
        )}
      </div>
    </div>
  );
}

export default App;