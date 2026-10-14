const UPSTREAM_TIMEOUT_MS = 6500;

function withTimeout(timeoutMs = UPSTREAM_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timer)
  };
}

function setPublicCache(res, maxAgeSeconds = 300) {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAgeSeconds}, stale-while-revalidate=60`
  );
}

module.exports = { withTimeout, setPublicCache };
