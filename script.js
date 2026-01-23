document.addEventListener("DOMContentLoaded", () => {

  let index = 0;

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

  // Devam et
  document.getElementById("nextBtn").addEventListener("click", () => {
    index++;
    if (!scenes[index]) return;

    const section = document.getElementById(scenes[index].id);
    section.style.display = "flex";
    section.scrollIntoView({ behavior: "smooth" });
    showScene(scenes[index]);
  });

  // EVENT DELEGATION (GARANTİ)
  document.body.addEventListener("click", (e) => {

    if (e.target.id === "noBtn") {
      e.target.style.opacity = "0";
      setTimeout(() => e.target.remove(), 300);
    }

    if (e.target.id === "yesBtn") {
      document.getElementById("choiceBox").innerHTML = "<p>Buradayım.</p>";

      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "♥";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1500);
    }

  });

});