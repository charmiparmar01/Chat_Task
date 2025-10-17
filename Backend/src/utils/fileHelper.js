const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

async function readJson(p) {
  const abs = path.resolve(p);
  const exists = fsSync.existsSync(abs);
  if (!exists) return null;
  const txt = await fs.readFile(abs, 'utf8');
  return JSON.parse(txt);
}

async function writeJson(p, obj) {
  const abs = path.resolve(p);
  const dir = path.dirname(abs);
  await ensureDir(dir);
  await fs.writeFile(abs, JSON.stringify(obj, null, 2), 'utf8');
}

async function exists(p) {
  return fsSync.existsSync(path.resolve(p));
}

async function ensureDir(dir) {
  const abs = path.resolve(dir);
  if (!fsSync.existsSync(abs)) {
    await fs.mkdir(abs, { recursive: true });
  }
}

module.exports = { readJson, writeJson, exists, ensureDir };
