import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // =============== 登录/注册相关 ===============
  // 定义一个变量 page 来控制当前显示哪个页面，初始值为 'login'，表示默认显示登录页面。
  const [page, setPage] = useState('login'); // login | register | todo
  // 定义一个变量 username 来存储用户输入的用户名，初始值为 '豆芽'。用setUsername函数来更新这个变量的值。
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [user, setUser] = useState(null);

  // 刷新时自动登录
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
      setPage('todo');
    }
  }, []);

  // 注册
  const handleRegister = () => {
    if (!username || !password || !repassword) {
      alert('请填写完整信息');
      return;
    }
    if (password !== repassword) {
      alert('两次密码不一致');
      return;
    }

    const userData = { username, password };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('注册成功！请登录');
    setPage('login');
  };

  // 登录
  const handleLogin = () => {
    const localUser = localStorage.getItem('user');
    if (!localUser) {
      alert('用户不存在，请先注册');
      return;
    }

    const userData = JSON.parse(localUser);
    if (userData.username === username && userData.password === password) {
      setUser(userData);
      setPage('todo');
    } else {
      alert('账号或密码错误');
    }
  };

  // 退出登录
  const handleLogout = () => {
    // 这里不删除用户数据，保持注册状态。下次登录时直接使用即可。
    // localStorage.removeItem('user');
    setUser(null);
    setPage('login');
    setUsername('');
    setPassword('');
  };

  // =============== TODO 相关 ===============
  const getLocalTodos = () => {
    const local = localStorage.getItem('todos');
    return local ? JSON.parse(local) : [];
  };

  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState(getLocalTodos);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setTodoList([
      ...todoList,
      { id: Date.now(), text: inputText, completed: false }
    ]);
    setInputText('');
  };

  const toggleComplete = (id) => {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
  };

  const clearAll = () => {
    setTodoList([]);
  };

  // =============== 页面渲染 ===============
  if (page === 'login') {
    return (
      <div className="auth-page">
        <div className="auth-box">
          <h2>登录</h2>
          <input
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="密码"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth-btn" onClick={handleLogin}>登录</button>
          <p className="link" onClick={() => setPage('register')}>
            没有账号？去注册
          </p>
        </div>
      </div>
    );
  }

  if (page === 'register') {
    return (
      <div className="auth-page">
        <div className="auth-box">
          <h2>注册</h2>
          <input
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="密码"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="确认密码"
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
          <button className="auth-btn" onClick={handleRegister}>注册</button>
          <p className="link" onClick={() => setPage('login')}>
            已有账号？去登录
          </p>
        </div>
      </div>
    );
  }

  // =============== 主页面 ===============
  return (
    <div className="app">
      <div className="container">
        <div className="top-row">
          <h1>我的代办清单 ✅</h1>
          <button className="logout-btn" onClick={handleLogout}>退出</button>
        </div>

        <form onSubmit={addTodo} className="input-form">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入新任务..."
          />
          <button type="submit">添加</button>
        </form>

        <div className="todo-list">
          {todoList.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
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