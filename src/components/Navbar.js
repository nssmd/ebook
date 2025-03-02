import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faShoppingCart, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

const Navbar = ({ username, activePage, onNavigate, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>电子书世界</h1>
        <p>欢迎您，{username}</p>
      </div>
      <ul className="navbar-nav">
        <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
          <button onClick={() => onNavigate('home')}>
            <FontAwesomeIcon icon={faHome} />
            <span>首页</span>
          </button>
        </li>
        <li className={`nav-item ${activePage === 'books' ? 'active' : ''}`}>
          <button onClick={() => onNavigate('books')}>
            <FontAwesomeIcon icon={faBook} />
            <span>书籍列表</span>
          </button>
        </li>
        <li className={`nav-item ${activePage === 'cart' ? 'active' : ''}`}>
          <button onClick={() => onNavigate('cart')}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>购物车</span>
          </button>
        </li>
        <li className={`nav-item ${activePage === 'orders' ? 'active' : ''}`}>
          <button onClick={() => onNavigate('orders')}>
            <FontAwesomeIcon icon={faClipboardList} />
            <span>我的订单</span>
          </button>
        </li>
        <li className="nav-item logout">
          <button onClick={onLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>退出登录</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 