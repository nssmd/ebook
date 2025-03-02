import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/BookList.css';

// 模拟电子书数据
const booksData = [
  {
    id: 1,
    title: '三体',
    author: '刘慈欣',
    cover: '/images/santi.jpg',
    price: 29.9,
    category: '科幻',
    description: '文化大革命如火如荼进行的同时，军方探寻外星文明的绝秘计划"红岸工程"取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。',
    publisher: '重庆出版社',
    publishDate: '2008-01-01',
    pages: '302',
    language: '简体中文',
    isbn: '9787536692930',
    format: '平装'
  },
  {
    id: 2,
    title: '活着',
    author: '余华',
    cover: '/images/huozhe.jpg',
    price: 19.8,
    category: '文学',
    description: '《活着》是余华的代表作，讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，因赌博而败家，一贫如洗；之后又因为战乱而成了孤家寡人，最后只得在穷困中度过余生。',
    publisher: '作家出版社',
    publishDate: '2012-08-01',
    pages: '191',
    language: '简体中文',
    isbn: '9787506365437',
    format: '平装'
  },
  {
    id: 3,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: '/images/bainiangudu.jpg',
    price: 39.5,
    category: '文学',
    description: '《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云变幻的历史。',
    publisher: '南海出版公司',
    publishDate: '2011-06-01',
    pages: '360',
    language: '简体中文',
    isbn: '9787544253994',
    format: '精装'
  },
  {
    id: 4,
    title: '人类简史',
    author: '尤瓦尔·赫拉利',
    cover: '/images/renleijiashi.jpg',
    price: 49.9,
    category: '历史',
    description: '《人类简史：从动物到上帝》是以色列历史学家尤瓦尔·赫拉利的著作，讲述了人类如何从史前古猿演变为智人，以及智人如何从狩猎采集社会发展为现代社会的历程。',
    publisher: '中信出版社',
    publishDate: '2014-11-01',
    pages: '440',
    language: '简体中文',
    isbn: '9787508647357',
    format: '精装'
  },
  {
    id: 5,
    title: '解忧杂货店',
    author: '东野圭吾',
    cover: '/images/jieyouzahuodian.jpg',
    price: 35.0,
    category: '小说',
    description: '《解忧杂货店》是东野圭吾的奇幻小说，讲述了在一家名为"解忧杂货店"的店铺，人们可以写下自己的烦恼投进店前的信箱，第二天就会在信箱里收到回答的故事。',
    publisher: '南海出版公司',
    publishDate: '2014-05-01',
    pages: '291',
    language: '简体中文',
    isbn: '9787544270878',
    format: '平装'
  },
  {
    id: 6,
    title: '围城',
    author: '钱钟书',
    cover: '/images/weicheng.jpg',
    price: 25.0,
    category: '文学',
    description: '《围城》是钱钟书所著的长篇小说，描写了青年方鸿渐从国外留学回来后的生活经历。小说借方鸿渐的婚姻生活，反映出当时社会的荒谬现象。',
    publisher: '人民文学出版社',
    publishDate: '1991-02-01',
    pages: '359',
    language: '简体中文',
    isbn: '9787020024759',
    format: '平装'
  },
  {
    id: 7,
    title: '平凡的世界',
    author: '路遥',
    cover: '/images/pingfandeshijie.jpg',
    price: 68.0,
    category: '文学',
    description: '《平凡的世界》是路遥创作的一部百万字的长篇小说，全景式地展示了中国当代城乡社会生活，描绘了社会各阶层普通人们的生活状态。',
    publisher: '北京十月文艺出版社',
    publishDate: '2017-06-01',
    pages: '1251',
    language: '简体中文',
    isbn: '9787530216781',
    format: '精装'
  },
  {
    id: 8,
    title: '月亮与六便士',
    author: '毛姆',
    cover: '/images/yueliangliubianci.jpg',
    price: 32.5,
    category: '文学',
    description: '《月亮与六便士》是英国小说家威廉·萨默塞特·毛姆的代表作之一，描述了一个中年证券经纪人，抛弃了他的妻子和孩子，追求自己的艺术理想的故事。',
    publisher: '上海译文出版社',
    publishDate: '2016-05-01',
    pages: '275',
    language: '简体中文',
    isbn: '9787532751471',
    format: '平装'
  },
  {
    id: 9,
    title: '白夜行',
    author: '东野圭吾',
    cover: '/images/baiyexing.jpg',
    price: 39.8,
    category: '小说',
    description: '《白夜行》是日本作家东野圭吾的代表作。故事围绕着一对有着不同寻常情愫的少年少女，描述了他们在周围世界不断死亡的情况下，为了生存和爱而走上犯罪道路的故事。',
    publisher: '南海出版公司',
    publishDate: '2013-01-01',
    pages: '538',
    language: '简体中文',
    isbn: '9787544258609',
    format: '平装'
  }
];

const BookList = ({ onViewDetails, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  
  // 提取所有类别
  const categories = ['全部', ...new Set(booksData.map(book => book.category))];
  
  // 根据搜索词和类别过滤书籍
  const filteredBooks = booksData.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2>电子书列表</h2>
        <div className="book-filters">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input 
              type="text" 
              placeholder="搜索书名或作者..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-category">{book.category}</p>
                <p className="book-price">¥{book.price.toFixed(2)}</p>
                <div className="book-actions">
                  <button 
                    className="btn-details"
                    onClick={() => onViewDetails(book)}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span>详情</span>
                  </button>
                  <button 
                    className="btn-add-cart"
                    onClick={() => onAddToCart(book)}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>加入购物车</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-books-found">
            <p>没有找到符合条件的书籍</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList; 