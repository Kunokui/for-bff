document.addEventListener("DOMContentLoaded", () => {
  const letter = document.getElementById("letter");
  const openBtn = document.getElementById("openBtn");
  const images = document.querySelectorAll(".image");

  openBtn.addEventListener("click", () => {
  openBtn.style.display = "none";

  // 1. Gọi pháo hoa ngay lập tức
  launchFireworks();
  
  // 2. Sau 2.5 giây mới mở thư và hiển thị ảnh + lời chúc
  setTimeout(() => {
    letter.classList.add("opened");

    images.forEach((img) => {
      img.classList.remove("hidden");
      img.classList.add("show");
      });
    }, 2500); // Delay 2.5 giây
  });
});
function launchFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createParticle(x, y) {
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: x,
        y: y,
        radius: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 8 + 3,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.005
      });
    }

    // 🔊 Phát âm thanh nổ
    const boom = document.getElementById("boomSound");
    boom.play();

    // Dừng sau 2 giây
    setTimeout(() => {
      boom.pause();
      boom.currentTime = 0;
    }, 2000);
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) particles.splice(i, 1);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
      ctx.fill();
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function hexToRgb(hsl) {
    const tmp = document.createElement("div");
    tmp.style.color = hsl;
    document.body.appendChild(tmp);
    const rgb = getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    return rgb.match(/\d+/g).slice(0, 3).join(',');
  }

  createParticle(canvas.width / 2, canvas.height / 2);

  // (Tùy chọn) thêm nhiều lần nổ
  setTimeout(() => createParticle(canvas.width / 2, canvas.height / 2), 600);
  setTimeout(() => createParticle(canvas.width / 2, canvas.height / 2), 1200);

  animate();
}