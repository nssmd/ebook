// 图片检查脚本
(function() {
  // 需要检查的图片列表
  const requiredImages = [
    '/images/santi.jpg',
    '/images/bainiangudu.jpg',
    '/images/renleijiashi.jpg',
    '/images/jieyouzahuodian.jpg',
    '/images/weicheng.jpg',
    '/images/pingfandeshijie.jpg',
    '/images/yueliangliubianci.jpg',
    '/images/baiyexing.jpg'
  ];
  
  // 检查图片是否存在
  function checkImages() {
    let missingImages = [];
    
    // 创建一个Promise数组，每个Promise检查一个图片
    const promises = requiredImages.map(imagePath => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({ path: imagePath, exists: true });
        img.onerror = () => resolve({ path: imagePath, exists: false });
        img.src = imagePath + '?t=' + new Date().getTime(); // 添加时间戳避免缓存
      });
    });
    
    // 等待所有检查完成
    Promise.all(promises).then(results => {
      // 过滤出缺失的图片
      missingImages = results.filter(result => !result.exists).map(result => result.path);
      
      // 如果有缺失的图片，显示提示
      if (missingImages.length > 0) {
        showImageAlert(missingImages);
      }
    });
  }
  
  // 显示图片缺失提示
  function showImageAlert(missingImages) {
    // 创建提示容器
    const alertContainer = document.createElement('div');
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '20px';
    alertContainer.style.left = '50%';
    alertContainer.style.transform = 'translateX(-50%)';
    alertContainer.style.zIndex = '9999';
    alertContainer.style.backgroundColor = '#fff';
    alertContainer.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    alertContainer.style.borderRadius = '8px';
    alertContainer.style.padding = '20px';
    alertContainer.style.maxWidth = '500px';
    alertContainer.style.width = '90%';
    
    // 创建提示内容
    const title = document.createElement('h3');
    title.textContent = '图片文件缺失';
    title.style.margin = '0 0 15px 0';
    title.style.color = '#e74c3c';
    
    const message = document.createElement('p');
    message.textContent = '以下图片文件未找到，这可能会影响网站的显示效果：';
    message.style.margin = '0 0 10px 0';
    
    const imageList = document.createElement('ul');
    imageList.style.margin = '0 0 15px 0';
    imageList.style.paddingLeft = '20px';
    
    missingImages.forEach(path => {
      const item = document.createElement('li');
      item.textContent = path;
      item.style.margin = '5px 0';
      imageList.appendChild(item);
    });
    
    const helpText = document.createElement('p');
    helpText.innerHTML = '您可以访问以下页面获取图片：<br>' +
      '1. <a href="/images/generate-images.html" target="_blank">图片生成工具</a><br>' +
      '2. <a href="/images/placeholder.html" target="_blank">图片占位符</a><br>' +
      '3. <a href="/images/README.md" target="_blank">图片说明文档</a>';
    helpText.style.margin = '0 0 15px 0';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '我知道了';
    closeButton.style.backgroundColor = '#6e8efb';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '8px 15px';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.float = 'right';
    closeButton.onclick = function() {
      document.body.removeChild(alertContainer);
    };
    
    // 组装提示
    alertContainer.appendChild(title);
    alertContainer.appendChild(message);
    alertContainer.appendChild(imageList);
    alertContainer.appendChild(helpText);
    alertContainer.appendChild(closeButton);
    
    // 添加到页面
    document.body.appendChild(alertContainer);
  }
  
  // 页面加载完成后检查图片
  window.addEventListener('load', checkImages);
})(); 