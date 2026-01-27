document.addEventListener("DOMContentLoaded", () => {

  let index = 0;
  let noCount = 0;

  const scenes = [
    { id: "section1", bg: "images-bg1.jpg" },
    { id: "section2", bg: "images-bg2.jpg", soft: true },
    { id: "section3", bg: "images-bg3.jpg" },
    { id: "section4", bg: "images-bg4.jpg", soft: true },
    { id: "section5", bg: "images-bg5.jpg" },
    { id: "section6", bg: "images-bg6.jpg", soft: true }
  ];

  function showScene(scene) {
    document.body.classList.remove("zoomed");

    document.body.style.backgroundImage = `url('${scene.bg}')`;
    document.body.style.backgroundSize = "cover";

    document.body.style.setProperty(
      "--overlay",
      scene.soft ? "rgba(15,23,42,0.35)" : "rgba(15,23,42,0.6)"
    );

    /* 🔴 KRİTİK: mobil sahne kadrajı için */
    document.body.className = scene.id;

    setTimeout(() => document.body.classList.add("zoomed"), 50);
  }

  /* İlk sahne */
  document.getElementById("section1").style.display = "flex";
  showScene(scenes[0]);

  /* 🎵 Arka plan müziği */
  document.body.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    if (music && music.paused) {
      music.volume = 0.3;
      music.play();
    }
  }, { once: true });

  /* Devam Et */
  document.getElementById("nextBtn").addEventListener("click", () => {
    index++;
    if (!scenes[index]) return;

    const section = document.getElementById(scenes[index].id);
    section.style.display = "flex";
    section.scrollIntoView({ behavior: "smooth" });
    showScene(scenes[index]);

    if (scenes[index].id === "section6") {
      document.getElementById("nextBtn").style.display = "none";
    }
  });

  /* ❤️ EVET / HAYIR */
  document.body.addEventListener("click", (e) => {

    const box = document.getElementById("choiceBox");
    if (!box) return;

    if (e.target.id === "noBtn") {
      noCount++;

      let message = "";
      if (noCount === 1) {
        message = "Yanlış cevap verdiniz.<br>Tekrar deneyiniz.";
      } else if (noCount === 2) {
        message = "Saçmalama,<br>evet nerede biliyorsun";
      } else {
        message = "Senin canın dayak istiyor";
      }

      box.innerHTML = `
        <p style="opacity:0.75;">${message}</p>
        <div style="margin-top:20px;">
          <button id="noBtn" class="choice no">Hayır</button>
          <button id="yesBtn" class="choice yes">Evet</button>
        </div>
      `;
    }

    if (e.target.id === "yesBtn") {
      box.innerHTML = "<p>💓 Oh sonunda katil olmadım. 💓</p>";

      /* Kalp animasyonu */
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "♥";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);

      /* Kalp sesi */
      const beat = new Audio("heartbeat.mp3");
      beat.volume = 0.6;
      beat.play();

      /* Yazı efekti */
      setTimeout(() => {
        const text =
          "Ve bu,\n" +
          "birlikte geçirdiğimiz\n" +
          "ilk Sevgililer Günü";

        const p = document.createElement("p");
        p.className = "valentineType";
        document.getElementById("section6").appendChild(p);

        let i = 0;
        const typing = setInterval(() => {
          if (i < text.length) {
            p.innerHTML += text[i] === "\n" ? "<br>" : text[i];
            i++;
          } else {
            clearInterval(typing);
          }
        }, 80);
      }, 2000);
    }
  });

  /* ❤️ İLİŞKİ SAYACI */
  const startDate = new Date("2025-12-01T00:00:00"); // ← burayı istersen değiştir

  function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    const counter = document.getElementById("counter");
    if (counter) {
      counter.innerHTML = `${days} gün ${hours} saat ${minutes} dakika`;
    }
  }

  updateCounter();
  setInterval(updateCounter, 60000);

  /* ✨ Yazı stili (JS içinden) */
  const style = document.createElement("style");
  style.innerHTML = `
    .valentineType {
      margin-top: 35px;
      font-size: 22px;
      font-weight: 600;
      opacity: 0.9;
      text-shadow: 0 0 10px rgba(255,120,120,0.6);
    }
  `;
  document.head.appendChild(style);

});
