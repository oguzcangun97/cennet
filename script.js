document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     GENEL DEĞİŞKENLER
  ===================== */
  let index = 0;
  let noCount = 0;
  let heartCount = 5;
  let heartbeatAudio = null;
  let finalPlayed = false;

  const scenes = [
    { id: "section1", bg: "images-bg1.jpg", pos: "center top" },
    { id: "section2", bg: "images-bg2.jpg", pos: "center 30%", soft: true },
    { id: "section3", bg: "images-bg3.jpg", pos: "center top" },
    { id: "section4", bg: "images-bg4.jpg", pos: "center 40%", soft: true },
    { id: "section5", bg: "images-bg5.jpg", pos: "center top" },
    { id: "section6", bg: "images-bg6.jpg", pos: "center 25%", soft: true }
  ];

  /* =====================
     SAHNE GÖSTER
  ===================== */
  function showScene(scene) {
    document.body.style.backgroundImage = `url('${scene.bg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";

    if (window.innerWidth < 768) {
      document.body.style.backgroundPosition = scene.pos || "center top";
    } else {
      document.body.style.backgroundPosition = "center center";
    }

    document.body.style.setProperty(
      "--overlay",
      scene.soft ? "rgba(15,23,42,0.35)" : "rgba(15,23,42,0.6)"
    );
  }

  document.getElementById("section1").style.display = "flex";
  showScene(scenes[0]);

  /* =====================
     DEVAM ET
  ===================== */
  document.getElementById("nextBtn").addEventListener("click", () => {
    index++;
    if (!scenes[index]) return;

    const sec = document.getElementById(scenes[index].id);
    sec.style.display = "flex";
    sec.scrollIntoView({ behavior: "smooth" });
    showScene(scenes[index]);

    if (scenes[index].id === "section6") {
      document.getElementById("nextBtn").style.display = "none";
    }
  });

  /* =====================
     KALP BAR
  ===================== */
  function renderHeartBar() {
    let hearts = "";
    for (let i = 0; i < 5; i++) {
      hearts += i < heartCount ? "❤️" : "🤍";
    }
    return `<div id="heartBar">${hearts}</div>`;
  }

  /* =====================
     TIKLAMALAR
  ===================== */
  document.body.addEventListener("click", (e) => {
    const box = document.getElementById("choiceBox");
    if (!box) return;

    /* ❌ HAYIR */
    if (e.target.id === "noBtn") {
      noCount++;
      heartCount--;

      let message = "";
      if (noCount === 1) message = "Yanlış cevap verdiniz.<br>Tekrar deneyiniz.";
      else if (noCount === 2) message = "Saçmalama,<br>evet nerede biliyorsun";
      else if (noCount === 3) message = "Senin canın dayak istiyor";
      else if (noCount === 4) message = "Emin misin?";
      else if (noCount === 5) message = "Peki… ama ben buradayım.";

      if (heartCount <= 0) {
        box.innerHTML = `
          <p><strong>Bir öpücüğe bir kalp daha?</strong> 💋❤️</p>
          <div style="margin-top:20px;">
            <button id="kissBtn" class="choice yes">Öpücük 💋</button>
            <button id="deadNoBtn" class="choice disabled">Hayır yok artık</button>
          </div>
          <p id="deadNoMsg" style="margin-top:12px; opacity:0.7;"></p>
        `;
        return;
      }

      box.innerHTML = `
        ${renderHeartBar()}
        <p style="opacity:0.85;">${message}</p>
        <div style="margin-top:20px;">
          <button id="noBtn" class="choice no">Hayır</button>
          <button id="yesBtn" class="choice yes">Evet</button>
        </div>
      `;
    }

    /* ❌ ÇALIŞMAYAN HAYIR */
    if (e.target.id === "deadNoBtn") {
      const msg = document.getElementById("deadNoMsg");
      if (msg) msg.textContent = "Bu buton artık çalışmıyor 🙂";
    }

    /* 💋 ÖPÜCÜK */
    if (e.target.id === "kissBtn") {
      heartCount = 1;
      box.innerHTML = `
        ${renderHeartBar()}
        <p>❤️ Kalbim geri geldi…</p>
        <p>Şimdi asıl soruya geçebiliriz.</p>
        <button id="yesBtn" class="choice yes">Devam 💓</button>
      `;
    }

    /* ✔️ EVET – FINAL (GARANTİLİ) */
    if (e.target.id === "yesBtn") {
      if (finalPlayed) return;
      finalPlayed = true;

      box.innerHTML = "<p>💓 Oh sonunda katil olmadım. 💓</p>";

      setTimeout(() => {

        const old = document.querySelector(".valentineType");
        if (old) old.remove();

        const lines = [
          "💓 Ve bu,",
          "💓 seninle geçirdiğimiz 💓",
          "💓 ilk Sevgililer Günü,💓"
        ];

        const container = document.createElement("div");
        container.className = "valentineType";
        document.getElementById("section6").appendChild(container);

        let line = 0, char = 0;

        function typeLine() {
          if (line >= lines.length) {
            const love = document.createElement("div");
            love.className = "loveBig";
            love.textContent = "💓 SENİ SEVİYORUM 💓";
            container.appendChild(love);

            if (!heartbeatAudio) {
              heartbeatAudio = new Audio("heartbeat.mp3");
              heartbeatAudio.loop = true;
              heartbeatAudio.volume = 0.8;
              heartbeatAudio.play().catch(() => {});
            }

            const counterEl = document.querySelector(".date");
            container.appendChild(counterEl);
            return;
          }

          if (!container.children[line]) {
            container.appendChild(document.createElement("div"));
          }

          if (char < lines[line].length) {
            container.children[line].textContent += lines[line][char++];
            setTimeout(typeLine, 80);
          } else {
            line++; char = 0;
            setTimeout(typeLine, 400);
          }
        }

        typeLine();
      }, 1200);
    }
  });

  /* =====================
     SAYAÇ
  ===================== */
  const startDate = new Date("2025-12-01T00:00:00");

  function updateCounter() {
    const diff = new Date() - startDate;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;

    const counter = document.getElementById("counter");
    if (counter) {
      counter.textContent = `${days} gün ${hours} saat ${minutes} dakika`;
    }
  }

  updateCounter();
  setInterval(updateCounter, 60000);

});

// 🚀 PWA Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

