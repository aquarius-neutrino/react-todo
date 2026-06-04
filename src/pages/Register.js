import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
export default function Register() {
    const navigate = useNavigate(); // 跳转工具
    // 定义一个变量 page 来控制当前显示哪个页面，初始值为 'login'，表示默认显示登录页面。
    const [page, setPage] = useState('login'); // login | register | todo
    // 定义一个变量 username 来存储用户输入的用户名，初始值为 '豆芽'。用setUsername函数来更新这个变量的值。
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [user, setUser] = useState(null);

    // 刷新时自动登录
    useEffect(() => {
        const localUser = localStorage.getItem('userAccount');
        if (localUser) {
            setUser(JSON.parse(localUser));
            navigate('/login');
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
        localStorage.setItem('userAccount', JSON.stringify(userData));
        alert('注册成功！请登录');
        navigate('/login');
    };

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
                <p className="link" onClick={() => navigate('/login')}>
                    已有账号？去登录
                </p>
            </div>
        </div>
    );
}