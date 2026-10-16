// Mật khẩu mở thiệp: 2010
const CORRECT_PASS = "2010";
let currentPass = "";

function pressKey(num) {
  if (currentPass.length < 4) {
    currentPass += num;
    updateDots();
  }

  if (currentPass.length === 4) {
    setTimeout(() => {
      if (currentPass === CORRECT_PASS) {
        document.getElementById('passcode-screen').classList.add('hidden');
        document.getElementById('player-screen').classList.remove('hidden');
        document.getElementById('overlay').classList.remove('hidden');
        audio.play();
        playIcon.className = "fa-solid fa-pause";
        isPlaying = true;
      } else {
        alert("Sai mật khẩu rồi nè! Gợi ý: 2010");
        clearKey();
      }
    }, 200);
  }
}

function clearKey() {
  currentPass = "";
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index < currentPass.length) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Xử lý Popup bức thư
function openPopup() {
  document.getElementById('overlay').classList.remove('hidden');
}

function closePopup() {
  document.getElementById('overlay').classList.add('hidden');
}

// Trình phát nhạc & Chạy chữ Lyrics
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressFill = document.getElementById('progress-fill');
const progressContainer = document.getElementById('progress-container');
const lyricsLines = document.querySelectorAll('.lyrics-scroll .line');
const lyricsScroll = document.getElementById('lyrics-scroll');

let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playIcon.className = "fa-solid fa-play";
    isPlaying = false;
  } else {
    audio.play();
    playIcon.className = "fa-solid fa-pause";
    isPlaying = true;
  }
});

audio.addEventListener('timeupdate', (e) => {
  const { currentTime, duration } = e.target;
  if (duration) {
    const percent = (currentTime / duration) * 100;
    progressFill.style.width = `${percent}%`;

    // Đồng bộ chạy chữ theo thời gian bài hát
    let activeIndex = 0;
    lyricsLines.forEach((line, index) => {
      const time = parseFloat(line.getAttribute('data-time'));
      if (currentTime >= time) {
        activeIndex = index;
      }
    });

    lyricsLines.forEach((line, index) => {
      if (index === activeIndex) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });

    const offset = activeIndex * 34; 
    lyricsScroll.style.transform = `translateY(-${offset}px)`;
  }
});

// Tua nhạc khi click vào thanh progress
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// Hiệu ứng hoa/tim rơi nền background
const fallingContainer = document.getElementById('falling-container');
const items = ['🌸', '🌷', '🍓', '✨', '💖'];

function createFallingItem() {
  const item = document.createElement('div');
  item.classList.add('falling-item');
  item.innerText = items[Math.floor(Math.random() * items.length)];
  item.style.left = Math.random() * 100 + 'vw';
  item.style.animationDuration = Math.random() * 3 + 4 + 's';
  fallingContainer.appendChild(item);

  setTimeout(() => item.remove(), 7000);
}

setInterval(createFallingItem, 350);