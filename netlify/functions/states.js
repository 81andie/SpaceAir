export const handler = async () => {
  try {
    const res = await fetch(
      'https://opensky-network.org/api/states/all',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    const text = await res.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Function failed',
        details: error.message
      })
    };
  }
};
