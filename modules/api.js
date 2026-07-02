async function fetchLatestQuake() {
  // TODO: replace with real JMA/NIED API later
  // For now, return a fake quake near Tokyo
  return {
    lat: 35.68,
    lon: 139.76,
    shindo: 4,
    regionName: "東京都",
    originTime: new Date().toISOString()
  };
}
