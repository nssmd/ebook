import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faShoppingCart, faInfoCircle, faStar, faBookOpen, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.css';

// 推荐书籍数据
const recommendedBooks = [
  {
    id: 1,
    title: '三体',
    author: '刘慈欣',
    cover: '/images/santi.jpg',
    description: '文化大革命如火如荼进行的同时，军方探寻外星文明的绝秘计划"红岸工程"取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。',
    price: 29.9,
    category: '科幻',
    rating: 9.3,
    publisher: '重庆出版社',
    publishDate: '2008-01-01',
    pages: '302',
    language: '简体中文',
    isbn: '9787536692930',
    format: '平装',
    authorDescription: '刘慈欣，中国科幻作家，被誉为中国科幻第一人。代表作《三体》三部曲获得世界科幻大奖"雨果奖"最佳长篇小说奖，是亚洲首位获得该奖项的作家。他的作品想象力丰富，融合了硬科幻与人文关怀。'
  },
  {
    id: 3,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: '/images/bainiangudu.jpg',
    description: '《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云变幻的历史。',
    price: 39.5,
    category: '文学',
    rating: 9.2,
    publisher: '南海出版公司',
    publishDate: '2011-06-01',
    pages: '360',
    language: '简体中文',
    isbn: '9787544253994',
    format: '精装',
    authorDescription: '加西亚·马尔克斯（1927-2014），哥伦比亚作家、记者和社会活动家，拉丁美洲魔幻现实主义文学的代表人物，1982年诺贝尔文学奖获得者。他的作品融合了现实与幻想，创造了一个独特的文学世界。'
  },
  {
    id: 4,
    title: '人类简史',
    author: '尤瓦尔·赫拉利',
    cover: '/images/renleijiashi.jpg',
    description: '《人类简史：从动物到上帝》是以色列历史学家尤瓦尔·赫拉利的著作，讲述了人类如何从史前古猿演变为智人，以及智人如何从狩猎采集社会发展为现代社会的历程。',
    price: 49.9,
    category: '历史',
    rating: 9.1,
    publisher: '中信出版社',
    publishDate: '2014-11-01',
    pages: '440',
    language: '简体中文',
    isbn: '9787508647357',
    format: '精装',
    authorDescription: '尤瓦尔·赫拉利，以色列历史学家，牛津大学历史学博士，现为耶路撒冷希伯来大学的历史系教授。他的著作《人类简史》《未来简史》和《今日简史》被翻译成多种语言，在全球畅销。'
  },
  {
    id: 5,
    title: '解忧杂货店',
    author: '东野圭吾',
    cover: '/images/jieyouzahuodian.jpg',
    description: '《解忧杂货店》是东野圭吾的奇幻小说，讲述了在一家名为"解忧杂货店"的店铺，人们可以写下自己的烦恼投进店前的信箱，第二天就会在信箱里收到回答的故事。',
    price: 35.0,
    category: '小说',
    rating: 8.8,
    publisher: '南海出版公司',
    publishDate: '2014-05-01',
    pages: '291',
    language: '简体中文',
    isbn: '9787544270878',
    format: '平装',
    authorDescription: '东野圭吾，日本著名推理小说家，毕业于大阪府立大学电气工学专业。他的作品风格多变，从本格推理到温情小说都有涉猎，作品中常常融入对人性的思考和社会问题的关注。'
  }
];

// 新书上架数据
const newBooks = [
  {
    id: 6,
    title: '围城',
    author: '钱钟书',
    cover: '/images/weicheng.jpg',
    price: 25.0,
    category: '文学',
    rating: 9.0,
    description: '《围城》是钱钟书所著的长篇小说，描写了青年方鸿渐从国外留学回来后的生活经历。小说借方鸿渐的婚姻生活，反映出当时社会的荒谬现象。',
    publisher: '人民文学出版社',
    publishDate: '1991-02-01',
    pages: '359',
    language: '简体中文',
    isbn: '9787020024759',
    format: '平装',
    authorDescription: '钱钟书（1910-1998），中国著名作家、学者，精通多国语言，学贯中西。他的作品语言机智幽默，充满了对人性的洞察和对社会的讽刺。'
  },
  {
    id: 7,
    title: '平凡的世界',
    author: '路遥',
    cover: '/images/pingfandeshijie.jpg',
    price: 68.0,
    category: '文学',
    rating: 9.0,
    description: '《平凡的世界》是路遥创作的一部百万字的长篇小说，全景式地展示了中国当代城乡社会生活，描绘了社会各阶层普通人们的生活状态。',
    publisher: '北京十月文艺出版社',
    publishDate: '2017-06-01',
    pages: '1251',
    language: '简体中文',
    isbn: '9787530216781',
    format: '精装',
    authorDescription: '路遥（1949-1992），中国当代作家，陕西清涧人。他的作品以现实主义风格著称，深刻反映了中国农村和城市的社会变迁，展现了普通人在时代洪流中的命运。'
  },
  {
    id: 8,
    title: '月亮与六便士',
    author: '毛姆',
    cover: '/images/yueliangliubianci.jpg',
    price: 32.5,
    category: '文学',
    rating: 8.8,
    description: '《月亮与六便士》是英国小说家威廉·萨默塞特·毛姆的代表作之一，描述了一个中年证券经纪人，抛弃了他的妻子和孩子，追求自己的艺术理想的故事。',
    publisher: '上海译文出版社',
    publishDate: '2016-05-01',
    pages: '275',
    language: '简体中文',
    isbn: '9787532751471',
    format: '平装',
    authorDescription: '威廉·萨默塞特·毛姆（1874-1965），英国小说家、剧作家和短篇小说家。他的作品风格冷静客观，常常带有讽刺意味，对人性有着深刻的洞察。'
  },
  {
    id: 9,
    title: '白夜行',
    author: '东野圭吾',
    cover: '/images/baiyexing.jpg',
    price: 39.8,
    category: '小说',
    rating: 9.2,
    description: '《白夜行》是日本作家东野圭吾的代表作。故事围绕着一对有着不同寻常情愫的少年少女，描述了他们在周围世界不断死亡的情况下，为了生存和爱而走上犯罪道路的故事。',
    publisher: '南海出版公司',
    publishDate: '2013-01-01',
    pages: '538',
    language: '简体中文',
    isbn: '9787544258609',
    format: '平装',
    authorDescription: '东野圭吾，日本著名推理小说家，毕业于大阪府立大学电气工学专业。他的作品风格多变，从本格推理到温情小说都有涉猎，作品中常常融入对人性的思考和社会问题的关注。'
  }
];

const Home = ({ onViewDetails, onAddToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const [wishlist, setWishlist] = useState({});
  const autoplayTimerRef = useRef(null);
  
  // 自动轮播
  useEffect(() => {
    // 清除之前的计时器
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    
    // 只有在自动播放开启时才设置新的计时器
    if (autoplay) {
      autoplayTimerRef.current = setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % recommendedBooks.length);
      }, 10000);
    }
    
    // 清理函数
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [autoplay, currentSlide, recommendedBooks.length]);
  
  // 处理幻灯片切换 - 简化逻辑，移除isTransitioning状态
  const handleSlideChange = (newIndex) => {
    setCurrentSlide(newIndex);
  };
  
  // 暂停自动轮播
  const pauseAutoplay = () => setAutoplay(false);
  
  // 恢复自动轮播
  const resumeAutoplay = () => setAutoplay(true);
  
  // 切换到上一张
  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + recommendedBooks.length) % recommendedBooks.length;
    handleSlideChange(newIndex);
    // 暂停自动轮播，然后10秒后恢复
    pauseAutoplay();
    setTimeout(resumeAutoplay, 10000);
  };
  
  // 切换到下一张
  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % recommendedBooks.length;
    handleSlideChange(newIndex);
    // 暂停自动轮播，然后10秒后恢复
    pauseAutoplay();
    setTimeout(resumeAutoplay, 10000);
  };
  
  // 切换到指定幻灯片
  const goToSlide = (index) => {
    handleSlideChange(index);
    pauseAutoplay();
    setTimeout(resumeAutoplay, 10000);
  };
  
  // 处理图片加载错误
  const handleImageError = (id) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  // 获取图片路径（带备用机制）
  const getImagePath = (book) => {
    if (imageErrors[book.id]) {
      return process.env.PUBLIC_URL + '/images/default-book.svg'; // 使用默认SVG图片
    }
    return process.env.PUBLIC_URL + book.cover; // 添加PUBLIC_URL前缀
  };
  
  // 切换心愿单状态
  const toggleWishlist = (bookId, event) => {
    event.stopPropagation();
    setWishlist(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };
  
  return (
    <div className="home-container">
      {/* 欢迎横幅 */}
      <div className="welcome-banner">
        <h1>欢迎来到电子书世界</h1>
        <p>探索知识的海洋，开启阅读之旅</p>
      </div>
      
      {/* 推荐书籍轮播图 */}
      <section className="book-carousel-section">
        <h2 className="section-title">精选推荐</h2>
        
        <div className="book-carousel" 
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <button className="carousel-btn prev-btn" onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <div className="carousel-container">
            {recommendedBooks.map((book, index) => (
              <div 
                key={book.id} 
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`
                }}
              >
                <div className="slide-content">
                  <div className="book-info">
                    <h2>{book.title}</h2>
                    <p className="book-author">{book.author}</p>
                    <div className="book-rating">
                      <FontAwesomeIcon icon={faStar} className="star-icon" />
                      <span>{book.rating}</span>
                    </div>
                    <p className="book-category">{book.category}</p>
                    <p className="book-description">{book.description}</p>
                    <p className="book-price">¥{book.price.toFixed(2)}</p>
                    
                    <div className="book-actions">
                      <button 
                        className="btn-details"
                        onClick={() => onViewDetails(book)}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <span>查看详情</span>
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
                  
                  <div className="book-cover">
                    <div className="book-cover-shadow"></div>
                    <div className="book-image-container">
                      <img 
                        src={getImagePath(book)} 
                        alt={book.title} 
                        onError={() => handleImageError(book.id)}
                      />
                      <div className="book-actions-overlay">
                        <button 
                          className={`wishlist-btn ${wishlist[book.id] ? 'active' : ''}`}
                          onClick={(e) => toggleWishlist(book.id, e)}
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <button 
                          className="preview-btn"
                          onClick={() => onViewDetails(book)}
                        >
                          <FontAwesomeIcon icon={faBookOpen} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn next-btn" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          
          <div className="carousel-indicators">
            {recommendedBooks.map((_, index) => (
              <button 
                key={index} 
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* 新书上架 */}
      <section className="new-books-section">
        <h2 className="section-title">新书上架</h2>
        
        <div className="new-books-grid">
          {newBooks.map(book => (
            <div key={book.id} className="new-book-card">
              <div className="new-book-cover">
                <img 
                  src={getImagePath(book)} 
                  alt={book.title} 
                  onError={() => handleImageError(book.id)}
                />
                <div className="book-rating-badge">
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <span>{book.rating}</span>
                </div>
                <div className="book-actions-overlay">
                  <button 
                    className={`wishlist-btn ${wishlist[book.id] ? 'active' : ''}`}
                    onClick={(e) => toggleWishlist(book.id, e)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button 
                    className="preview-btn"
                    onClick={() => onViewDetails(book)}
                  >
                    <FontAwesomeIcon icon={faBookOpen} />
                  </button>
                </div>
              </div>
              <div className="new-book-info">
                <h3>{book.title}</h3>
                <p className="new-book-author">{book.author}</p>
                <p className="new-book-category">{book.category}</p>
                <p className="new-book-price">¥{book.price.toFixed(2)}</p>
                <div className="new-book-actions">
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
          ))}
        </div>
      </section>
      
      {/* 阅读指南 */}
      <section className="reading-guide-section">
        <h2 className="section-title">阅读指南</h2>
        
        <div className="reading-guide-container">
          <div className="guide-card">
            <div className="guide-icon">📚</div>
            <h3>精选好书</h3>
            <p>我们精心挑选各类优质电子书，满足您的阅读需求</p>
          </div>
          
          <div className="guide-card">
            <div className="guide-icon">💰</div>
            <h3>优惠价格</h3>
            <p>比实体书更实惠的价格，让阅读不再是负担</p>
          </div>
          
          <div className="guide-card">
            <div className="guide-icon">📱</div>
            <h3>随时阅读</h3>
            <p>支持多设备阅读，随时随地享受阅读乐趣</p>
          </div>
          
          <div className="guide-card">
            <div className="guide-icon">🔒</div>
            <h3>安全保障</h3>
            <p>购买后永久保存在您的账户中，不怕丢失</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 