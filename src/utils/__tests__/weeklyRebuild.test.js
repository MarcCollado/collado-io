const test = require('node:test');
const assert = require('node:assert/strict');

const {
  default: rebuild,
  config,
} = require('../../../netlify/functions/weekly-rebuild.mjs');

const HOOK = 'https://api.netlify.com/build_hooks/test';

test.afterEach(() => {
  delete process.env.BUILD_HOOK_URL;
});

test('runs on Mondays at 06:00 UTC', () => {
  assert.equal(config.schedule, '0 6 * * 1');
});

test('posts to the build hook', async (t) => {
  process.env.BUILD_HOOK_URL = HOOK;
  const fetch = t.mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    status: 200,
  }));

  await rebuild();

  assert.equal(fetch.mock.callCount(), 1);
  assert.deepEqual(fetch.mock.calls[0].arguments, [HOOK, { method: 'POST' }]);
});

test('fails when the hook is not configured', async () => {
  await assert.rejects(rebuild(), /BUILD_HOOK_URL is not set/);
});

test('fails when the hook rejects the call', async (t) => {
  process.env.BUILD_HOOK_URL = HOOK;
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 404 }));

  await assert.rejects(rebuild(), /Build hook returned 404/);
});
