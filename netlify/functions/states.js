
let cacheStore = {
  data: null,
  time: 0
};

const CACHE_DURATION = 30 * 1000; // 30s

const fetchWithRetry = async (url, options, retries = 2) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return res;

  } catch (err) {
    clearTimeout(timeout);

    if (retries > 0) {
      return fetchWithRetry(url, options, retries - 1);
    }

    throw err;
  }
};

export const handler = async () => {
  try {
    const now = Date.now();

    console.log("🚀 Function states called");
    console.log("⏱️ Timestamp:", now);

    // 🔥 CACHE HIT
    if (cacheStore.data && now - cacheStore.time < CACHE_DURATION) {
      console.log("⚡ CACHE HIT");

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Cache": "HIT"
        },
        body: JSON.stringify(cacheStore.data)
      };
    }

    console.log("🌍 Fetching OpenSky API...");

    const res = await fetchWithRetry(
      "https://opensky-network.org/api/states/all",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive"
        }
      }
    );

    console.log("📡 OpenSky Status:", res.status);

    let data;

    try {
      data = await res.json();
    } catch (err) {
      console.log("❌ JSON parse error:", err);
      data = null;
    }

    console.log("📦 Raw response preview:");
    console.log(JSON.stringify(data)?.slice(0, 300));

    if (!data || !Array.isArray(data.states)) {
      console.log("⚠️ Invalid OpenSky response structure:", data);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Error": "invalid-data"
        },
        body: JSON.stringify({
          states: [],
          error: true,
          message: "Invalid response from OpenSky"
        })
      };
    }

    // 🔥 SAVE CACHE
    cacheStore.data = data;
    cacheStore.time = now;

    console.log("💾 Cache updated");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "MISS",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.log("❌ FUNCTION ERROR:");
    console.error(error);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Fallback": "true"
      },
      body: JSON.stringify({
        states: [],
        error: true,
        message: "Temporary fallback response"
      })
    };
  }
};

