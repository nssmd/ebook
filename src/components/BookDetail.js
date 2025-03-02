import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart, faHeart, faShare, faStar, faBook, faCalendarAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import '../styles/BookDetail.css';

const BookDetail = ({ book, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    onAddToCart(book, quantity);
  };
  
  // 处理图片加载错误
  const handleImageError = () => {
    setImageError(true);
  };
  
  // 获取图片路径（带备用机制）
  const getImagePath = () => {
    if (imageError || !book.cover) {
      return process.env.PUBLIC_URL + '/images/default-book.svg'; // 使用默认SVG图片
    }
    return process.env.PUBLIC_URL + book.cover; // 添加PUBLIC_URL前缀
  };
  
  if (!book) {
    return (
      <div className="book-detail-container">
        <div className="no-book-selected">
          <p>请选择一本书查看详情</p>
          <button className="back-btn" onClick={onBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>返回列表</span>
          </button>
        </div>
      </div>
    );
  }

  // 添加更多书籍详情信息
  const bookDetails = {
    publisher: book.publisher || "未知出版社",
    publishDate: book.publishDate || "未知出版日期",
    pages: book.pages || "未知页数",
    language: book.language || "简体中文",
    isbn: book.isbn || "未知ISBN",
    format: book.format || "平装",
  };

  return (
    <div className="book-detail-container">
      <div className="book-detail-header">
        <button className="back-btn" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>返回列表</span>
        </button>
        <h2>书籍详情</h2>
      </div>
      
      <div className="book-detail-content">
        <div className="book-detail-left">
          <div className="book-detail-cover">
            <img 
              src={getImagePath()} 
              alt={book.title} 
              onError={handleImageError}
            />
            {book.rating && (
              <div className="book-rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <span>{book.rating}</span>
              </div>
            )}
          </div>
          <div className="book-actions">
            <button className="btn-wishlist">
              <FontAwesomeIcon icon={faHeart} />
              <span>收藏</span>
            </button>
            <button className="btn-share">
              <FontAwesomeIcon icon={faShare} />
              <span>分享</span>
            </button>
          </div>
          
          {/* 添加更多书籍信息 */}
          <div className="book-additional-info">
            <h3>图书信息</h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faBook} />
                <span>出版社: {bookDetails.publisher}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>出版日期: {bookDetails.publishDate}</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faLanguage} />
                <span>语言: {bookDetails.language}</span>
              </li>
              <li>
                <span>页数: {bookDetails.pages}</span>
              </li>
              <li>
                <span>ISBN: {bookDetails.isbn}</span>
              </li>
              <li>
                <span>装帧: {bookDetails.format}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="book-detail-right">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">作者：{book.author}</p>
          <div className="book-meta">
            <span className="book-category">{book.category}</span>
            <span className="book-price">¥{book.price.toFixed(2)}</span>
          </div>
          
          <div className="book-description">
            <h3>内容简介</h3>
            <p>{book.description}</p>
          </div>
          
          {/* 添加作者简介 */}
          <div className="author-description">
            <h3>作者简介</h3>
            <p>{book.authorDescription || `${book.author}是一位备受读者喜爱的作家，创作了多部畅销作品，其作品以深刻的洞察力和独特的叙事风格著称。`}</p>
          </div>
          
          <div className="book-purchase">
            <div className="quantity-control">
              <label htmlFor="quantity">数量：</label>
              <div className="quantity-input">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >-</button>
                <input 
                  type="number" 
                  id="quantity" 
                  min="1" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            
            <div className="total-price">
              总价：<span>¥{(book.price * quantity).toFixed(2)}</span>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>加入购物车</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 