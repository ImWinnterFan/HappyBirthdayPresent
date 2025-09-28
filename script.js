document.addEventListener('DOMContentLoaded', () => {
  const birthdayBox = document.querySelector('.Birthdaybox');
  const box = document.querySelector('.box');
  const emoji = document.querySelector('.emoji');
  const trickEmojis = ['🍰'];
  const treatEmojis = ['💩', '🕷', '👻'];

  let boxOpened = false;
  let startX, startY;
  let rotateX = -25;
  let rotateY = -25;
  let isDragging = false;

  // 初期回転
  birthdayBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // 回転更新関数
  function updateRotation(deltaX, deltaY) {
    const sensitivity = 0.3;
    rotateY += deltaX * sensitivity;
    rotateX -= deltaY * sensitivity;
    birthdayBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  // 📱 タッチ操作
  birthdayBox.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    isDragging = true;
  }, { passive: true });

  birthdayBox.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    updateRotation(deltaX, deltaY);
    startX = touch.clientX;
    startY = touch.clientY;
  }, { passive: true });

  birthdayBox.addEventListener('touchend', () => {
    isDragging = false;
  });

  // 🖱️ マウス操作
  birthdayBox.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;
  });

  birthdayBox.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    updateRotation(deltaX, deltaY);
    startX = e.clientX;
    startY = e.clientY;
  });

  birthdayBox.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // 🎁 箱を開けるクリックイベント
  box.addEventListener('click', () => {
    if (boxOpened) return;
    boxOpened = true;
    birthdayBox.classList.add('box-open');

    const isTreat = Math.random() < 0.5;
    const emojiList = isTreat ? treatEmojis : trickEmojis;
    const selectedEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    emoji.textContent = selectedEmoji;
    birthdayBox.style.setProperty('--boxInnerText', `'${isTreat ? 'treat' : 'trick'}'`);
  });

  // CodePen用自動クリック（必要なら削除OK）
  if (location.pathname.includes('fullcpgrid')) {
    setTimeout(() => box.click(), 250);
  }
});
window.addEventListener('click', () => {
  const bgm = document.getElementById('bgm');
  if (bgm.paused) {
    bgm.play();
  }
});