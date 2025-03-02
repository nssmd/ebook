import React, { useState } from 'react';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // 处理登录表单变化
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理注册表单变化
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理登录提交
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // 简单验证
    if (!loginData.username || !loginData.password) {
      setError('请填写用户名和密码');
      return;
    }
    
    // 模拟验证 - 在实际应用中应该使用后端API
    if (loginData.username === 'wzm' && loginData.password === '050826') {
      onLogin(loginData.username);
    } else {
      setError('用户名或密码错误');
    }
  };

  // 处理注册提交
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    // 验证表单
    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setError('请填写所有字段');
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    if (registerData.password.length < 6) {
      setError('密码长度至少为6个字符');
      return;
    }
    
    // 模拟注册成功 - 在实际应用中应该使用后端API
    alert(`注册成功！欢迎 ${registerData.username}`);
    onLogin(registerData.username);
  };

  // 切换登录/注册表单
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isLogin ? '登录' : '注册'}</h2>
          <p>{isLogin ? '登录您的电子书账户' : '创建一个新的电子书账户'}</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {isLogin ? (
          // 登录表单
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input 
                type="text" 
                name="username" 
                placeholder="用户名" 
                value={loginData.username}
                onChange={handleLoginChange}
              />
            </div>
            
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input 
                type="password" 
                name="password" 
                placeholder="密码" 
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            
            <div className="form-options">
              <label>
                <input type="checkbox" /> 记住我
              </label>
              <a href="#forgot">忘记密码？</a>
            </div>
            
            <button type="submit" className="login-btn">登录</button>
          </form>
        ) : (
          // 注册表单
          <form className="login-form" onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input 
                type="text" 
                name="username" 
                placeholder="用户名" 
                value={registerData.username}
                onChange={handleRegisterChange}
              />
            </div>
            
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <input 
                type="email" 
                name="email" 
                placeholder="电子邮箱" 
                value={registerData.email}
                onChange={handleRegisterChange}
              />
            </div>
            
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input 
                type="password" 
                name="password" 
                placeholder="密码" 
                value={registerData.password}
                onChange={handleRegisterChange}
              />
            </div>
            
            <div className="form-group">
              <div className="input-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="确认密码" 
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
              />
            </div>
            
            <button type="submit" className="login-btn register-btn">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>创建账户</span>
            </button>
          </form>
        )}
        
        <div className="login-footer">
          <p>
            {isLogin ? '还没有账户？' : '已有账户？'}
            <button 
              type="button" 
              className="toggle-btn"
              onClick={toggleForm}
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 