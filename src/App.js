import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import Orders from './components/Orders';

function App() {
  // 登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  // 当前页面状态
  const [activePage, setActivePage] = useState('home');
  
  // 书籍详情状态
  const [selectedBook, setSelectedBook] = useState(null);
  
  // 购物车状态
  const [cartItems, setCartItems] = useState([]);
  
  // 处理登录
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };
  
  // 处理登出
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setActivePage('home');
    setSelectedBook(null);
  };
  
  // 处理页面导航
  const handleNavigate = (page) => {
    setActivePage(page);
    setSelectedBook(null);
  };
  
  // 查看书籍详情
  const handleViewBookDetails = (book) => {
    setSelectedBook(book);
    setActivePage('bookDetail');
  };
  
  // 返回书籍列表
  const handleBackToList = () => {
    setSelectedBook(null);
    setActivePage('books');
  };
  
  // 添加商品到购物车
  const handleAddToCart = (book, quantity = 1) => {
    setCartItems(prevItems => {
      // 检查商品是否已在购物车中
      const existingItemIndex = prevItems.findIndex(item => item.book.id === book.id);
      
      if (existingItemIndex >= 0) {
        // 如果已存在，更新数量
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // 如果不存在，添加新商品
        return [...prevItems, { book, quantity }];
      }
    });
    
    // 显示添加成功提示
    alert(`已将《${book.title}》添加到购物车`);
  };
  
  // 更新购物车商品数量
  const handleUpdateCartQuantity = (bookId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.book.id === bookId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  // 从购物车移除商品
  const handleRemoveFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.book.id !== bookId));
  };
  
  // 结算购物车
  const handleCheckout = () => {
    alert('订单已提交，感谢您的购买！');
    setActivePage('orders');
    // 不清空购物车，让订单页面可以显示结算信息
    // setCartItems([]);
  };
  
  // 渲染当前页面内容
  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }
    
    switch (activePage) {
      case 'home':
        return (
          <Home 
            onViewDetails={handleViewBookDetails} 
            onAddToCart={handleAddToCart} 
          />
        );
      case 'books':
        return (
          <BookList 
            onViewDetails={handleViewBookDetails} 
            onAddToCart={handleAddToCart} 
          />
        );
      case 'bookDetail':
        return (
          <BookDetail 
            book={selectedBook} 
            onBack={handleBackToList} 
            onAddToCart={handleAddToCart} 
          />
        );
      case 'cart':
        return (
          <Cart 
            cartItems={cartItems} 
            onUpdateQuantity={handleUpdateCartQuantity} 
            onRemoveItem={handleRemoveFromCart} 
            onCheckout={handleCheckout} 
          />
        );
      case 'orders':
        return <Orders cartItems={cartItems} />;
      default:
        return (
          <Home 
            onViewDetails={handleViewBookDetails} 
            onAddToCart={handleAddToCart} 
          />
        );
    }
  };
  
  return (
    <div className="App">
      {isLoggedIn && (
        <Navbar 
          username={username} 
          activePage={activePage} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
        />
      )}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
