import { useState } from 'react';

function App() {
  // 输入框内容
  const [inputText, setInputText] = useState('');
  // 任务列表
  const [todoList, setTodoList] = useState([]);

  // 添加任务
  function addTodo() {
    if (inputText.trim() === '') return;
    setTodoList([...todoList, inputText]);
    setInputText('');
  }

  // 删除单个任务
  function deleteTodo(deleteIndex) {
    const newList = todoList.filter((_, index) => index !== deleteIndex);
    setTodoList(newList);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>我的代办清单</h1>

      {/* 输入框 + 添加按钮 */}
      <div style={{ marginBottom: 10 }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入任务"
          style={{ padding: 8, width: 250 }}
        />
        <button onClick={addTodo} style={{ marginLeft: 5, padding: '8px 12px' }}>
          添加
        </button>
      </div>

      {/* 任务列表 */}
      <ul style={{ paddingLeft: 20 }}>
        {todoList.map((item, index) => (
          <li key={index} style={{ margin: '5px 0' }}>
            {index + 1}、{item}
            <button
              onClick={() => deleteTodo(index)}
              style={{ marginLeft: 10, color: 'red' }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>

      {/* 清空所有 */}
      {todoList.length > 0 && (
        <button
          onClick={() => setTodoList([])}
          style={{ marginTop: 10, color: 'red' }}
        >
          清空所有任务
        </button>
      )}
    </div>
  );
}

export default App;