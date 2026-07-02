let countdownTimer;

function startWaveCountdown(quake, userLocation) {
  if (countdownTimer) clearInterval(countdownTimer);

  const origin = new Date(quake.originTime).getTime();
  const dist = distanceKm(
    { lat: quake.lat, lon: quake.lon },
    userLocation
  );

  const vP = 6;   // km/s
  const vS = 3.5; // km/s

  const pArrival = origin + (dist / vP) * 1000;
  const sArrival = origin + (dist / vS) * 1000;

  const el = document.getElementById("countdown");

  countdownTimer = setInterval(() => {
    const now = Date.now();
    const pLeft = Math.max(0, Math.round((pArrival - now) / 1000));
    const sLeft = Math.max(0, Math.round((sArrival - now) / 1000));

    el.textContent =
      `P波到達まで: ${pLeft} 秒 / S波到達まで: ${sLeft} 秒`;

    if (pLeft === 0 && sLeft === 0) {
      clearInterval(countdownTimer);
    }
  }, 500);
}
