import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Todo from './pages/Todo';

function App() {
  return (
    <div>

      {/* 导航栏（点击跳转） */}
      <nav style={{ 
        background: '#f5f5f5',
        padding: '15px 20px',
        marginBottom: 20
      }}>
        <Link to="/" style={{ marginRight: 15 }}>首页</Link>
        <Link to="/todo" style={{ marginRight: 15 }}>待办清单</Link>
        <Link to="/login" style={{ marginRight: 15 }}>登录</Link>
        <Link to="/register" style={{ marginRight: 15 }}>注册</Link>
      </nav>

      {/* 路由规则：路径 → 对应哪个页面 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  );
}

export default App;