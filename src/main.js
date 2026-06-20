//!  happy birthday
function goToScene() {
  welcome.classList.add("hide");
  setTimeout(() => {
    welcome.style.display = "none";
  }, 500);
}
//!  box
let opened = false;
function openBox() {
  if (opened) return;
  opened = true;
  const box = document.getElementById("boxWrapper");
  const lid = document.getElementById("boxLid");
  const cat = document.getElementById("catContainer");
  const sparkles = document.getElementById("sparkles");
  const wishes = document.getElementById("wishes");

  document.getElementById("hint").classList.add("hide");

  box.classList.add("shaking");
  setTimeout(() => {
    box.classList.remove("shaking");
    box.classList.add("sliding");
    setTimeout(() => {
      lid.classList.add("open");
      sparkles.classList.add("visible");
      setTimeout(() => {
        cat.style.opacity = "1";
        cat.classList.add("popping");
        const followText = document.getElementById("followText");
        followText.classList.add("show");
        setTimeout(() => {
          followText.classList.remove("show");
        }, 1000);
        setTimeout(() => {
          cat.classList.remove("popping");
          void cat.offsetWidth;
          box.classList.remove("sliding");
          box.classList.add("removing");
          setTimeout(() => box.remove(), 500);
        }, 1000);
      }, 300);
    }, 200);
  }, 1400);

  setTimeout(() => {
    document.querySelectorAll(".paw, .leg, .shake").forEach((el) => {
      el.style.animation = "none";
    });
    document.getElementById("birthdayCake").classList.add("show");
    launchConfetti();
    wishes.classList.add("show");
  }, 5000);
  setTimeout(() => {
    //!  count
    startCountdownThenEnvelope();
  }, 7000);
}

function startCountdownThenEnvelope() {
  const overlay = document.getElementById("countdownOverlay");
  overlay.style.display = "block";

  const c3 = document.getElementById("cnt3");
  const c2 = document.getElementById("cnt2");
  const c1 = document.getElementById("cnt1");

  //!  3
  c3.classList.add("show");
  setTimeout(() => {
    c3.classList.remove("show");
    c3.style.display = "none";
    //!  2
    c2.classList.add("show");
    setTimeout(() => {
      c2.classList.remove("show");
      c2.style.display = "none";
      //!  1
      c1.classList.add("show");
      setTimeout(() => {
        c1.classList.remove("show");
        c1.style.display = "none";
        overlay.style.display = "none";
        showEnvelope();
      }, 900);
    }, 900);
  }, 900);
}
//!  envelope
function showEnvelope() {
  const envOverlay = document.getElementById("envelopeOverlay");
  const cssletterEl = document.getElementById("cssletterEl");
  envOverlay.classList.add("show");

  setTimeout(() => {
    cssletterEl.classList.add("appear");
    setupEnvelopeLogic();
  }, 50);
}

function setupEnvelopeLogic() {
  const letters = document.querySelectorAll(".letter");
  const lettersContainer = document.querySelector("#cssletterEl .letters");
  let zIndexCounter = 10;

  const shuffledThings = Array.from(letters);
  shuffledThings.forEach((letter) => {
    lettersContainer.appendChild(letter);
    const center =
      document.querySelector(".cssletter").offsetWidth / 2 -
      letter.offsetWidth / 2;
    letter.style.left = `${center}px`;
    function isOverflown(element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    }
    if (!isOverflown(letter)) {
      letter.classList.add("center");
    }

    //!  letter
    letter.addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("env-hint").style.animation = "none";
      document.getElementById("env-hint").style.opacity = "0";
      document.getElementById("letters").style.zIndex = "300";

      letter.style.position = "absolute";
      letter.style.left = `${center}px`;
      letter.style.top = "-30px";

      letter.style.transform = "scale(1.08)";
      letter.style.transition = "all .35s ease";
    });
  });

  function openTheEnvelope(e) {
    e.stopPropagation();
    document.querySelector(".envelope").classList.add("active");

    document.getElementById("env-hint").style.animation =
      "hintPulse 1.5s infinite";
    document.getElementById("env-hint").style.opacity = "1";
  }

  document
    .querySelector("#openEnvelope")
    .addEventListener("click", openTheEnvelope);
  document
    .querySelector("#mainEnvelope")
    .addEventListener("click", openTheEnvelope);
}

document.querySelector(".scene").addEventListener("click", openBox);

//!  Confetti
const confettiColors = [
  "#f2abe7",
  "#9fa3ec",
  "#86d2e1",
  "#fec31e",
  "#ff6b6b",
  "#a8edea",
];
function launchConfetti() {
  for (let i = 0; i < 200; i++) {
    createConfettiPiece(i * 15);
  }
}
function createConfettiPiece(delayMs) {
  const el = document.createElement("div");
  el.className = "confetti-piece";
  const size = Math.floor(Math.random() * 10 + 5);
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const color =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const duration = Math.random() * 3000 + 3000;
  el.style.cssText = `width:${size}px;height:${size}px;left:${startX}vw;top:${startY}vh;background-color:${color};`;
  const rotateEl = document.createElement("div");
  rotateEl.style.cssText = `position:absolute;width:100%;height:100%;animation:confettiDriftRotate ${(1 + Math.random()).toFixed(2)}s infinite ease-in-out;animation-delay:-${Math.random().toFixed(2)}s;`;
  const askewEl = document.createElement("div");
  askewEl.style.cssText = `position:absolute;width:100%;height:100%;background-color:${color};animation:confettiDrift ${(1 + Math.random()).toFixed(2)}s infinite alternate ease-in-out;animation-delay:-${Math.random().toFixed(2)}s;`;
  rotateEl.appendChild(askewEl);
  el.appendChild(rotateEl);
  document.body.appendChild(el);
  setTimeout(() => {
    const opacity = Math.random() + 0.1;
    el.animate(
      [
        { transform: "translate3d(0,0,0)", opacity },
        {
          transform: `translate3d(${Math.random() * 40 - 20}vw,110vh,0)`,
          opacity: 1,
        },
      ],
      { duration, iterations: Infinity, delay: -(Math.random() * 5000) },
    );
  }, delayMs);
}
