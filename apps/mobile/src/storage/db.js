import * as SQLite from "expo-sqlite";

let db;

function getDb() {
  if (!db) db = SQLite.openDatabaseSync("sintonia.db");
  return db;
}

export async function initDb() {
  const database = getDb();

  database.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS checkins (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      mood INTEGER,
      energy INTEGER,
      sleep_quality INTEGER,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS exams (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      kind TEXT NOT NULL,
      source_uri TEXT NOT NULL,
      file_name TEXT,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reports (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);
}

export function insertCheckIn({ id, createdAt, mood, energy, sleepQuality, notes }) {
  const database = getDb();
  const stmt = database.prepareSync(
    "INSERT INTO checkins (id, created_at, mood, energy, sleep_quality, notes) VALUES (?, ?, ?, ?, ?, ?)"
  );
  try {
    stmt.executeSync([id, createdAt, mood, energy, sleepQuality, notes ?? null]);
  } finally {
    stmt.finalizeSync();
  }
}

export function listRecentCheckIns(limit = 14) {
  const database = getDb();
  const stmt = database.prepareSync(
    "SELECT id, created_at, mood, energy, sleep_quality, notes FROM checkins ORDER BY created_at DESC LIMIT ?"
  );
  try {
    const rows = stmt.executeSync([limit]).getAllSync();
    return rows;
  } finally {
    stmt.finalizeSync();
  }
}

export function insertExam({ id, createdAt, kind, sourceUri, fileName, status }) {
  const database = getDb();
  const stmt = database.prepareSync(
    "INSERT INTO exams (id, created_at, kind, source_uri, file_name, status) VALUES (?, ?, ?, ?, ?, ?)"
  );
  try {
    stmt.executeSync([id, createdAt, kind, sourceUri, fileName ?? null, status]);
  } finally {
    stmt.finalizeSync();
  }
}

export function listExams(limit = 50) {
  const database = getDb();
  const stmt = database.prepareSync(
    "SELECT id, created_at, kind, source_uri, file_name, status FROM exams ORDER BY created_at DESC LIMIT ?"
  );
  try {
    return stmt.executeSync([limit]).getAllSync();
  } finally {
    stmt.finalizeSync();
  }
}

