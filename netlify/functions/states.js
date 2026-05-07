export const handler = async () => {
  try {
    const now = Date.now();
    console.log("🚀 Function states called");
    console.log("⏱️ Timestamp:", now);

    // 🔥 CACHE
    if (cache && now - cacheTime < CACHE_DURATION) {
      console.log("⚡ Returning CACHE HIT");

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Cache': 'HIT'
        },
        body: JSON.stringify(cache)
      };
    }

    console.log("🌍 Fetching OpenSky API...");

    const res = await fetchWithRetry(
      'https://opensky-network.org/api/states/all',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    console.log("📡 Response status:", res.status);

    const data = await res.json();

    console.log("📦 Raw data received:");
    console.log(JSON.stringify(data)?.slice(0, 300));

    if (!data || !data.states) {
      console.log("⚠️ WARNING: data.states is empty or undefined");
    }

    cache = data;
    cacheTime = now;

    console.log("💾 Cache updated");

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.log("❌ ERROR in function:");
    console.error(error);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Fallback': 'true'
      },
      body: JSON.stringify({
        states: [],
        error: true,
        message: 'Temporary fallback response'
      })
    };
  }
};
