import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cart.css';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    // 计算总价
    const total = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };
  
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>购物车</h2>
        <span className="cart-count">{cartItems.length} 件商品</span>
      </div>
      
      {cartItems.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-item-header">
              <div className="item-info-header">商品信息</div>
              <div className="item-price-header">单价</div>
              <div className="item-quantity-header">数量</div>
              <div className="item-total-header">金额</div>
              <div className="item-action-header">操作</div>
            </div>
            
            {cartItems.map(item => (
              <div key={item.book.id} className="cart-item">
                <div className="item-info">
                  <div className="item-cover">
                    <img src={item.book.cover} alt={item.book.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.book.title}</h3>
                    <p className="item-author">{item.book.author}</p>
                    <span className="item-category">{item.book.category}</span>
                  </div>
                </div>
                
                <div className="item-price">
                  ¥{item.book.price.toFixed(2)}
                </div>
                
                <div className="item-quantity">
                  <div className="quantity-input">
                    <button 
                      onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.book.id, parseInt(e.target.value) || 1)}
                    />
                    <button onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                
                <div className="item-total">
                  ¥{(item.book.price * item.quantity).toFixed(2)}
                </div>
                
                <div className="item-action">
                  <button 
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.book.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>总计：</span>
              <span className="total-amount">¥{totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={onCheckout}
            >
              <FontAwesomeIcon icon={faShoppingBag} />
              <span>结算</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
          <p>购物车是空的</p>
          <p className="empty-cart-tip">快去添加你喜欢的电子书吧！</p>
        </div>
      )}
    </div>
  );
};

export default Cart; 