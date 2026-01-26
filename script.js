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

    document.body.style.backgroundImage = "url('" + scene.bg + "')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    document.body.style.setProperty(
      "--overlay",
      scene.soft ? "rgba(15,23,42,0.35)" : "rgba(15,23,42,0.6)"
    );

    setTimeout(() => document.body.classList.add("zoomed"), 50);
  }

  // İlk sahne
  document.getElementById("section1").style.display = "flex";
  showScene(scenes[0]);

  // Devam Et
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

  // Evet / Hayır
  document.body.addEventListener("click", (e) => {

    const box = document.getElementById("choiceBox");
    if (!box) return;

    // ❌ HAYIR
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

    // ✔️ EVET
    if (e.target.id === "yesBtn") {
      box.innerHTML = "<p>Oh sonunda.</p>";

      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "♥";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);

      setTimeout(() => {
        const p = document.createElement("p");
        p.innerHTML = `
          Ve bu,<br>
          birlikte geçirdiğimiz<br>
          <strong>ilk Sevgililer Günü</strong>
        `;
        p.style.marginTop = "30px";
        p.style.opacity = "0.8";
        document.getElementById("section6").appendChild(p);
      }, 2000);
    }

  });

});
