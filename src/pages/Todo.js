import { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
export default function Todo() {
    const navigate = useNavigate();

    // 权限拦截：没登录 → 强制跳回登录页
    useEffect(() => {
        const loginStatus = localStorage.getItem('loginStatus');
        if (!loginStatus) {
            alert('请先登录');
            navigate('/login');
        }
    }, []);

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


    // =============== 主页面 ===============
    return (
        <div className="app">
            <div className="container">
                <div className="top-row">
                    <h1>我的代办清单 ✅</h1>
                    <button className="logout" onClick={() => {
                        localStorage.removeItem('loginStatus');
                        alert('已退出登录');
                        navigate('/login');
                    }}>退出登录</button>
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