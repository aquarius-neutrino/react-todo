import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 跳转工具

  // 登录逻辑
  const handleLogin = () => {
    // 取出本地注册的账号
    const user = localStorage.getItem('userAccount');

    if (!user) {
      alert('请先注册');
      navigate('/register');
      return;
    }

    const { username: u, password: p } = JSON.parse(user);

    // 验证账号密码
    if (u === username && p === password) {
      alert('登录成功');
      // 保存登录状态
      localStorage.setItem('loginStatus', 'ok');
      // ✅ 登录成功 → 跳转到 TODO
      navigate('/todo');
    } else {
      alert('账号或密码错误');
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto' }}>
      <h2>登录</h2>
      <input
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', margin: '10px 0', padding: 8, width: '100%' }}
      />
      <input
        placeholder="密码"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px 0', padding: 8, width: '100%' }}
      />
      <button onClick={handleLogin} style={{ padding: '8px 16px' }}>
        登录
      </button>
    </div>
  );
}