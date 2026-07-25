import crypto from 'node:crypto';

/**
 * Converts a standard Google Drive URL into a direct binary stream
 * and validates that the downloaded payload is not an HTML page.
 *
 * @param {string} shareUrl - Standard browser URL from Google Drive
 * @returns {Promise<Buffer>} The off-heap raw Buffer of the actual file
 */
async function fetchGoogleDriveBinary(shareUrl) {
  // 1. Extract the unique File ID using regular expressions
  const idMatch =
    shareUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    shareUrl.match(/id=([a-zA-Z0-9_-]+)/);

  if (!idMatch || !idMatch[1]) {
    throw new Error(
      '[URL Error] Could not extract File ID from the provided Google Drive link.',
    );
  }

  const fileId = idMatch[1];
  console.log(`[URL Parser] Extracted File ID: ${fileId}`);

  // 2. Construct the direct API download endpoint
  const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  console.log(
    `[Network I/O] Requesting binary stream from: ${directDownloadUrl}`,
  );

  // 3. Execute network fetch, explicitly allowing redirection to Google CDN servers
  const httpResponse = await fetch(directDownloadUrl, {
    redirect: 'follow', // Crucial for cloud providers that use 302 redirects to CDN nodes
  });

  if (!httpResponse.ok) {
    throw new Error(
      `[Network Error] Download failed with HTTP status: ${httpResponse.statusText}`,
    );
  }

  // 4. Allocate raw memory Buffer from network stream
  const rawArrayBuffer = await httpResponse.arrayBuffer();
  const rawBuffer = Buffer.from(rawArrayBuffer);

  // 5. SECURITY & INTEGRITY CHECK: Verify the magic bytes
  const magicHeaderHex = rawBuffer.subarray(0, 4).toString('hex');
  console.log(
    `[Inspect] Downloaded size: ${rawBuffer.length} bytes. Magic Header: ${magicHeaderHex}`,
  );

  // If the header is still '<!DO' (3c21444f), Google blocked direct download (e.g., file >100MB virus scan check)
  if (magicHeaderHex === '3c21444f') {
    throw new Error(
      '[Boundary Failure] Received HTML preview instead of binary. File might be >100MB requiring manual virus scan confirmation.',
    );
  }

  return rawBuffer;
}

fetchGoogleDriveBinary(
  'https://drive.google.com/file/d/1j449tegbTp3WnrSHm2PnCYDv7X2U4S_v/view?usp=sharing',
);
