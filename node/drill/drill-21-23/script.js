// @ts-check
// Drill: drill-21-23
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

import fs from 'node:fs/promises';

/**
 * Universal asynchronous file loader and JSON parser.
 * This function enforces the I/O boundary rule: Raw Bytes -> UTF-8 String -> V8 JS Object.
 *
 * @param {string} filePath - Absolute or relative path to the target JSON file.
 * @returns {Promise<Object>} The parsed JavaScript object from V8 heap.
 */
async function loadJsonFile(filePath) {
  try {
    // 1. Explicitly request UTF-8 decoding from the OS/Node runtime
    const rawStringData = await fs.readFile(filePath, {
      encoding: 'utf-8',
      flag: 'r',
    });

    // 2. Parse the UTF-16 string into an actionable JavaScript Object/Array
    const parsedObject = JSON.parse(rawStringData);

    return parsedObject;
  } catch (error) {
    // Boundary protection: Catch file system errors (ENOENT) or syntax errors (SyntaxError)
    console.error(`[I/O Error] Failed to process file at path: ${filePath}`);
    throw error;
  }
}

/**
 * Main execution controller to demonstrate scaling the loader across multiple files.
 */
async function bootstrapApplication() {
  // Define file targets
  const configPath = './config.json';
  const usersPath = './tsconfig.json';

  console.log('--- Starting System I/O Bootstrap ---');

  // Load two different files using the same architectural template
  const appConfig = await loadJsonFile(configPath);
  const usersList = await loadJsonFile(usersPath);
  console.log('loaded config object: ', appConfig);
  // Return loaded structures for further verification
  return { appConfig, usersList };
}

// Execute the bootstrap process
bootstrapApplication();
