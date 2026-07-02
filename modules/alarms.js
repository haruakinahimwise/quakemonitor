const alertEl = document.getElementById("alert");

const eewAudio = new Audio("assets/alarm_eew.mp3");
const strongAudio = new Audio("assets/alarm_strong.mp3");

function triggerAlarm(quake) {
  if (quake.shindo >= 5) {
    alertEl.textContent =
      "【緊急地震速報】 強い揺れに警戒してください";
    alertEl.style.background = "#7f1d1d";
    alertEl.style.color = "#fee2e2";

    strongAudio.currentTime = 0;
    strongAudio.play();
  } else {
    alertEl.textContent =
      `地震検知: 震度${quake.shindo} / ${quake.regionName || "不明"}`;
    alertEl.style.background = "#111827";
    alertEl.style.color = "#e5e7eb";

    eewAudio.currentTime = 0;
    eewAudio.play();
  }
}
