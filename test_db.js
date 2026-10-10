const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');
const DB_PATH = 'C:/Users/wolfn/.gemini/antigravity/conversation_summaries.db';

try {
  const db = new DatabaseSync(DB_PATH, { readOnly: true });
  const rows = db.prepare('SELECT workspace_uris, last_modified_time FROM conversation_summaries ORDER BY last_modified_time DESC LIMIT 5').all();
  console.log('Rows:', rows);
  db.close();
} catch (e) {
  console.error('DB error:', e.message);
}
