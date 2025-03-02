const https = require('https');
const fs = require('fs');
const path = require('path');

// 图书封面数据
const books = [
  { title: '三体', filename: 'santi.jpg', color: '6e8efb' },
  { title: '百年孤独', filename: 'bainiangudu.jpg', color: 'a777e3' },
  { title: '人类简史', filename: 'renleijiashi.jpg', color: 'e74c3c' },
  { title: '解忧杂货店', filename: 'jieyouzahuodian.jpg', color: '27ae60' },
  { title: '围城', filename: 'weicheng.jpg', color: 'f39c12' },
  { title: '平凡的世界', filename: 'pingfandeshijie.jpg', color: '3498db' },
  { title: '月亮与六便士', filename: 'yueliangliubianci.jpg', color: '9b59b6' },
  { title: '白夜行', filename: 'baiyexing.jpg', color: '34495e' }
];

// 确保images目录存在
const imagesDir = path.join(__dirname);
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 下载图片函数
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ 已下载: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除不完整的文件
      console.error(`❌ 下载失败: ${filename}`, err.message);
      reject(err);
    });
  });
}

// 下载所有图片
async function downloadAllImages() {
  console.log('开始下载图书封面图片...');
  
  for (const book of books) {
    const url = `https://via.placeholder.com/300x450/${book.color}/ffffff?text=${encodeURIComponent(book.title)}`;
    try {
      await downloadImage(url, book.filename);
    } catch (error) {
      console.error(`下载 ${book.filename} 时出错:`, error);
    }
  }
  
  console.log('所有图片下载完成！');
}

// 执行下载
downloadAllImages(); 