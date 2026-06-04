import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // 路由核心

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>  {/* 把整个项目包起来 → 开启路由 */}
    <App />
  </BrowserRouter>
);

