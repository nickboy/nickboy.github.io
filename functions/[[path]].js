// Catch-all route for Cloudflare Pages Functions
export async function onRequest(context) {
  // Pass through to static assets
  return context.env.ASSETS.fetch(context.request);
}