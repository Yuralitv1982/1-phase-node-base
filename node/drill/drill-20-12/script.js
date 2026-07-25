// @ts-check
// Drill: drill-20-12
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

// Define absolute file paths to avoid relative resolution errors
const CONFIG_FILE_PATH = path.resolve('./config.json');
const USERS_FILE_PATH = path.resolve('./tsconfig.json');

/**
 * Step 1: Mock Data Generation
 * Creates temporary JSON files on disk to simulate external I/O sources.
 */
async function createTestFiles() {
  const mockConfig = {
    port: 3000,
    host: '127.0.0.1',
    database: {
      name: 'production_db',
      maxConnections: 20,
    },
  };

  const mockUsers = [
    { id: 1, role: 'admin', active: true },
    { id: 2, role: 'operator', active: false },
  ];

  // Write mock structures to disk as UTF-8 encoded binary streams
  await fs.writeFile(
    CONFIG_FILE_PATH,
    JSON.stringify(mockConfig, null, 2),
    'utf-8',
  );
  await fs.writeFile(
    USERS_FILE_PATH,
    JSON.stringify(mockUsers, null, 2),
    'utf-8',
  );
  console.log('[Setup] Test files created successfully on disk.');
}

/**
 * Step 2: The Architectural Blueprint (I/O Boundary -> V8 Heap)
 * Universal loader that guarantees transformation from raw bytes to JS objects.
 *
 * @param {string} filePath - Target file path
 * @returns {Promise<Object|Array>} Parsed JavaScript structure
 */
async function loadJsonFile(filePath) {
  try {
    // Explicitly instruct Node.js to decode off-heap Buffer into V8 UTF-16 String
    const rawStringData = await fs.readFile(filePath, {
      encoding: 'utf-8',
      flag: 'r',
    });

    // Transform string representation into active V8 memory objects
    const parsedData = JSON.parse(rawStringData);

    return parsedData;
  } catch (error) {
    // Architectural boundary: intercept file system and parsing exceptions
    console.error(`[I/O Error] Failed to process file at: ${filePath}`);
    throw error;
  }
}

/**
 * Step 3: Strict Runtime Verification
 * Uses native assertions to prove memory state and payload integrity.
 * If any check fails, execution terminates immediately with a stack trace.
 */
function verifyLoadedData(configData, usersData) {
  console.log('[Verification] Running strict assertions...');

  // 1. Verify V8 Heap allocation types (Prove it is not a raw Buffer or null)
  assert.equal(
    typeof configData,
    'object',
    'Assertion Failed: Config must be an object.',
  );
  assert.equal(
    configData instanceof Buffer,
    false,
    'Assertion Failed: Config is still a raw Buffer!',
  );
  assert.notEqual(
    configData,
    null,
    'Assertion Failed: Config object cannot be null.',
  );

  // 2. Verify business logic payload integrity for configuration
  assert.ok('port' in configData, 'Assertion Failed: "port" property missing.');
  assert.equal(
    typeof configData.port,
    'number',
    'Assertion Failed: "port" must be a number.',
  );
  assert.equal(configData.port, 3000, 'Assertion Failed: Port value mismatch.');

  // 3. Verify Array structure and payload integrity for users list
  assert.equal(
    Array.isArray(usersData),
    true,
    'Assertion Failed: Users data must be an Array.',
  );
  assert.equal(
    usersData.length,
    2,
    'Assertion Failed: Users array length mismatch.',
  );
  assert.equal(
    usersData[0].role,
    'admin',
    'Assertion Failed: User role mismatch.',
  );
  assert.deepEqual(
    Object.keys(usersData[0]),
    ['id', 'role', 'active'],
    'Assertion Failed: Object schema mismatch.',
  );

  console.log(
    '[Verification] ALL ASSERTIONS PASSED. Memory state is proven correct.',
  );
}

/**
 * Step 4: Environment Cleanup
 * Removes generated test files from disk to maintain idempotency.
 */
async function cleanupTestFiles() {
  await fs.unlink(CONFIG_FILE_PATH);
  await fs.unlink(USERS_FILE_PATH);
  console.log('[Cleanup] Temporary test files removed from disk.');
}

/**
 * Main Application Controller
 * Orchestrates the full lifecycle: Setup -> I/O Load -> Assert -> Cleanup
 */
async function executeLifecycle() {
  try {
    console.log('=== Starting System Lifecycle ===');

    // 1. Prepare disk environment
    await createTestFiles();

    // 2. Execute I/O using our architectural blueprint
    const loadedConfig = await loadJsonFile(CONFIG_FILE_PATH);
    const loadedUsers = await loadJsonFile(USERS_FILE_PATH);

    // 3. Run mathematical proof of correctness via strict assertions
    verifyLoadedData(loadedConfig, loadedUsers);

    // 4. Restore disk environment
    await cleanupTestFiles();

    console.log('=== Lifecycle Completed Successfully ===');
  } catch (fatalError) {
    // Ensure cleanup runs even if assertions or I/O fail
    try {
      await cleanupTestFiles();
    } catch (_) {}

    console.error('[Fatal Error] System execution halted:', fatalError.message);
    process.exitCode = 1;
  }
}

// Launch application controller
executeLifecycle();
