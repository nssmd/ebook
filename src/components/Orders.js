import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faDownload, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Orders.css';

const Orders = ({ cartItems = [] }) => {
  // 计算当前订单总金额
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  };
  
  // 生成当前日期
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // 生成订单号
  const generateOrderId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${year}${month}${day}-${random}`;
  };
  
  // 创建当前订单对象
  const currentOrder = cartItems.length > 0 ? {
    id: generateOrderId(),
    date: getCurrentDate(),
    status: '待处理',
    totalAmount: calculateTotal(),
    items: cartItems.map(item => ({
      id: item.book.id,
      title: item.book.title,
      author: item.book.author,
      cover: item.book.cover,
      price: item.book.price,
      quantity: item.quantity
    }))
  } : null;
  
  // 只使用当前订单，不包含历史订单
  const allOrders = currentOrder ? [currentOrder] : [];

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>我的订单</h2>
      </div>
      
      {/* 当前订单提示 */}
      {currentOrder && (
        <div className="current-order-alert">
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>您的订单已提交成功！订单号: {currentOrder.id}</span>
        </div>
      )}
      
      {allOrders.length > 0 ? (
        <div className="orders-list">
          {allOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <div className="order-id">
                    <span>订单号：</span>
                    <span>{order.id}</span>
                  </div>
                  <div className="order-date">
                    <span>下单时间：</span>
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status === '已完成' ? 'completed' : order.status === '待处理' ? 'pending' : ''}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-cover">
                      <img src={process.env.PUBLIC_URL + item.cover} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <p className="item-author">{item.author}</p>
                      <div className="item-price-quantity">
                        <span className="item-price">¥{item.price.toFixed(2)}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-total">
                  <span>共 {order.items.length} 件商品，总计：</span>
                  <span className="total-amount">¥{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="order-actions">
                  <button className="btn-invoice">
                    <FontAwesomeIcon icon={faFileInvoice} />
                    <span>查看发票</span>
                  </button>
                  <button className="btn-download">
                    <FontAwesomeIcon icon={faDownload} />
                    <span>下载电子书</span>
                  </button>
                  <button className="btn-details">
                    <FontAwesomeIcon icon={faEye} />
                    <span>订单详情</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-orders">
          <div className="empty-orders-icon">
            <FontAwesomeIcon icon={faFileInvoice} />
          </div>
          <p>您还没有订单</p>
          <p className="empty-orders-tip">快去选购您喜欢的电子书吧！</p>
        </div>
      )}
    </div>
  );
};

export default Orders; 