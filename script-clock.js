const tabs = document.querySelectorAll(".tab");
const views = document.querySelectorAll(".view");

// ===== Navigation =====
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    views.forEach(v => v.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.view).classList.add("active");
  });
});

// ===== Real-time Clock (Digital + Analog) =====
function updateClock() {
  const now = new Date();
  document.getElementById("rt-time").textContent = now.toLocaleTimeString();
  document.getElementById("rt-date").textContent = now.toDateString();

  const hourHand = document.querySelector(".hand.hour");
  const minHand = document.querySelector(".hand.minute");
  const secHand = document.querySelector(".hand.second");

  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  // Rotate hands precisely
  const hourDeg = (h * 30) + (m * 0.5);
  const minDeg = (m * 6) + (s * 0.1);
  const secDeg = s * 6;

  hourHand.style.transform = `translate(-50%, 0) rotate(${hourDeg}deg)`;
  minHand.style.transform = `translate(-50%, 0) rotate(${minDeg}deg)`;
  secHand.style.transform = `translate(-50%, 0) rotate(${secDeg}deg)`;
}
setInterval(updateClock, 1000);
updateClock();

// ===== Timer =====
let timerInterval;
const timerDisplay = document.getElementById("t-display");

document.getElementById("t-start").addEventListener("click", () => {
  const min = +document.getElementById("t-min").value || 0;
  const sec = +document.getElementById("t-sec").value || 0;
  let remaining = min * 60 + sec;
  if (remaining <= 0) return alert("⏳ Set a valid time!");

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const m = String(Math.floor(remaining / 60)).padStart(2, "0");
    const s = String(remaining % 60).padStart(2, "0");
    timerDisplay.textContent = `${m}:${s}`;

    if (remaining-- <= 0) {
      clearInterval(timerInterval);
      alert("⏰ Timer done!");
    }
  }, 1000);
});

document.getElementById("t-reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerDisplay.textContent = "00:00";
});

// ===== Stopwatch =====
let swInterval, swStart = 0, swElapsed = 0;
const swDisplay = document.getElementById("sw-display");

function updateStopwatch() {
  swElapsed = Date.now() - swStart;
  const m = String(Math.floor(swElapsed / 60000)).padStart(2, "0");
  const s = String(Math.floor(swElapsed / 1000) % 60).padStart(2, "0");
  const ms = String(swElapsed % 1000).padStart(3, "0");
  swDisplay.textContent = `${m}:${s}.${ms}`;
}

document.getElementById("sw-start").addEventListener("click", () => {
  if (swInterval) return;
  swStart = Date.now() - swElapsed;
  swInterval = setInterval(updateStopwatch, 10);
});

document.getElementById("sw-stop").addEventListener("click", () => {
  clearInterval(swInterval);
  swInterval = null;
});

document.getElementById("sw-reset").addEventListener("click", () => {
  clearInterval(swInterval);
  swInterval = swElapsed = 0;
  swDisplay.textContent = "00:00.000";
});

// ===== Alarm =====
const alarmList = document.getElementById("alarm-list");
const alarms = [];

document.getElementById("add-alarm").addEventListener("click", () => {
  const time = document.getElementById("alarm-time").value;
  if (!time) return alert("Set an alarm time!");

  alarms.push(time);
  const li = document.createElement("li");
  li.textContent = time;
  alarmList.appendChild(li);
});

setInterval(() => {
  const now = new Date();
  const current = now.toTimeString().slice(0, 5);
  if  (alarms.includes(current)) {
    alert(`🔔 Alarm! It's ${current}`);
      window.location.reload();
     }
  
}, 1000);