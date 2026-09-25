// Rebuilds the site every Monday, so /podcast and /blog pick up new episodes
// and Bugada posts from their external feeds. BUILD_HOOK_URL is a Netlify
// build hook, set in the site's environment variables.
export default async () => {
  const hook = process.env.BUILD_HOOK_URL;
  if (!hook) {
    throw new Error('BUILD_HOOK_URL is not set');
  }

  const response = await fetch(hook, { method: 'POST' });
  if (!response.ok) {
    throw new Error(`Build hook returned ${response.status}`);
  }
};

// Mondays at 06:00 UTC
export const config = {
  schedule: '0 6 * * 1',
};
