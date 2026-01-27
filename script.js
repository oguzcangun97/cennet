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

  const sections = document.querySelectorAll("section");
  const nextBtn = document.getElementById("nextBtn");

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function resetBodySceneClasses() {
    scenes.forEach(scene => {
      document.body.classList.remove(scene.id);
    });
  }

  function showScene(scene) {

    /* 📱 MOBİL */
    if (isMobile()) {
      sections.forEach(sec => sec.style.display = "none");
      window.scrollTo(0, 0);
    }

    resetBodySceneClasses();          // 🔴 EKSİK OLAN KISIM
    document.body.classList.add(scene.id);

    document.body.classList.remove("zoomed");

    document.body.style.backgroundImage = `url('${scene.bg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.setProperty(
      "--overlay",
      scene.soft ? "rgba(15,23,42,0.35)" : "rgba(15,23,42,0.6)"
    );

    const section = document.getElementById(scene.id);
    section.style.display = "flex";

    /* 💻 WEB */
    if (!isMobile()) {
      section.appendChild(nextBtn);
      nextBtn.style.position = "relative";
      nextBtn.style.marginTop = "60px";
    }
    /* 📱 MOBİL */
    else {
      nextBtn.style.position = "fixed";
      nextBtn.style.bottom = "80px";
      nextBtn.style.right = "30px";
      nextBtn.style.marginTop = "0";
    }

    setTimeout(() => document.body.classList.add("zoomed"), 50);
  }

  /* İlk sahne */
  showScene(scenes[0]);

  /* 🎵 Müzik */
  document.body.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    if (music && music.paused) {
      music.volume = 0.3;
      music.play();
    }
  }, { once: true });

  /* ▶️ DEVAM ET */
  nextBtn.addEventListener("click", () => {
    index++;
    if (!scenes[index]) return;

    showScene(scenes[index]);

    if (!isMobile()) {
      document
        .getElementById(scenes[index].id)
        .scrollIntoView({ behavior: "smooth" });
    }

    if (scenes[index].id === "section6") {
      nextBtn.style.display = "none";
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
