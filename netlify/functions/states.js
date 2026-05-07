let cache = null;
let cacheTime = 0;

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

    // 🔥 CACHE
    if (cache && now - cacheTime < CACHE_DURATION) {
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

    const res = await fetchWithRetry(
      'https://opensky-network.org/api/states/all',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    const data = await res.json();

    // 🔥 guardamos cache
    cache = data;
    cacheTime = now;

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
    console.error('States function error:', error);

    // 🔥 fallback seguro (evita romper Angular)
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
