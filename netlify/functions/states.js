
let cacheStore = {
  data: null,
  time: 0
};

const CACHE_DURATION = 30 * 1000;

export const handler = async () => {
  try {
    const now = Date.now();

    console.log("🚀 Function states called");
    console.log("⏱️ Timestamp:", now);

    // 🔥 CACHE
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

    const token = process.env.OpenUser;

    const res = await fetch(
      "https://opensky-network.org/api/states/all",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    console.log("📡 OpenSky Status:", res.status);

    const data = await res.json();

    console.log("📦 Data received:", JSON.stringify(data)?.slice(0, 300));

    if (!data || !Array.isArray(data.states)) {
      console.log("⚠️ Invalid response from OpenSky");

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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "MISS"
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
