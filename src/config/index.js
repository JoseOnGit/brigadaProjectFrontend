const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    //  [::1] is IPv6 localhost address
    window.location.hostname === "[::1]" ||
    //  127.0.0.1/8 is IPv4 localhost address
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export const API_URL = isLocalhost
  ? "http://localhost:3001/api"
  : "https://server.mirka-a-jozef.com";
