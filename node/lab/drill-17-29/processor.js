// processor.js

import fs from 'node:fs/promises';

async function processUsers(filePath) {
  const appName = process.env.APP_NAME ?? 'UserProcessor';
  console.log('service is runing. Name :', appName);

  console.log('test function : ', checkAccess(25));

  //console.log(filePath);

  //console.log(import.meta);
  //
  //

  const parseBalance = (valStr) => {
    return Number(valStr);
  };

  console.log(parseBalance('63'));
  console.log('-'.repeat(30));
  try {
    const fielContent = await fs.readFile(filePath, 'utf8');

    return fielContent;
  } catch (error) {
    console.error(error);
    throw new Error('File not found');
  }
}

function checkAccess(age) {
  return age >= 18 ? 'adult' : 'minor';
}
export default processUsers;
