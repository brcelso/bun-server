Bun.serve({
  port: process.env.PORT || 3000, // Porta dinâmica para se ajustar ao Vercel
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("Welcome to Bun Server running on Vercel!", {
        status: 200,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    } else {
      return new Response("404 Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }
  },
});
