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
    document.body.style.backgroundPosition = "center";

    document.body.style.setProperty(
      "--overlay",
      scene.soft ? "rgba(15,23,42,0.35)" : "rgba(15,23,42,0.6)"
    );

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

  /* ▶️ DEVAM ET */
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

  /* ❤️ EVET / HAYIR + DAKTİLO YAZI */
  document.body.addEventListener("click", (e) => {

    const box = document.getElementById("choiceBox");
    if (!box) return;

    /* ❌ HAYIR */
    if (e.target.id === "noBtn") {
      noCount++;

      let message =
        noCount === 1 ? "Yanlış cevap verdiniz.<br>Tekrar deneyiniz." :
        noCount === 2 ? "Saçmalama,<br>evet nerede biliyorsun" :
        "Senin canın dayak istiyor";

      box.innerHTML = `
        <p style="opacity:0.75;">${message}</p>
        <div style="margin-top:20px;">
          <button id="noBtn" class="choice no">Hayır</button>
          <button id="yesBtn" class="choice yes">Evet</button>
        </div>
      `;
    }

    /* ✔️ EVET */
    if (e.target.id === "yesBtn") {
      box.innerHTML = "<p>💓 Oh sonunda katil olmadım. 💓</p>";

      setTimeout(() => {
        const text =
          "💓 Ve bu,\n 💓" +
          "💓 seninle geçirdiğimiz 💓\n" +
          "💓 ilk Sevgililer Günü,💓\n"+
          "💓 SENİ SEVİYORUM,💓";

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
        }, 90); // daktilo hızı
      }, 1500);
    }
  });

  /* ❤️ İLİŞKİ SAYACI */
  const startDate = new Date("2025-12-01T00:00:00");

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

});

