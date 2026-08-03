import fs from 'node:fs/promises';

console.log('HELLO FROM PROCESSOR.MODULE');
async function processUsers(filePath) {
  const appName = process.env.APP_NAME ?? 'UserProcessor';

  console.log('Service is runnign. Name: ', appName);

  const parseBalance = (valStr) => {
    const methodOne = Number(valStr);
    const methodTwo = +valStr;
    const methodTree = parseFloat(valStr);

    console.log('Converted balances: ', methodOne, methodTwo, methodTree);

    return methodOne;
  };

  try {
    const fielContent = await fs.readFile(filePath, 'utf8');

    const users = JSON.parse(fielContent);

    const validUsers = [];

    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];

      const currentLength = validUsers.push(currentUser);
      console.log('Added user. Array length is now: ', currentLength);

      const status = checkAccess(currentUser.age);

      if (status === 'minor') {
        validUsers.pop();
        console.log('User is too young.Removed from valid list.');
      } else {
        currentUser.balance = parseBalance(currentUser.balance);
      }
    }
    return new Promise((resolve) => {
      const resultObject = {
        appName: appName,
        users: validUsers,

        getSummary() {
          return `Report from ${this.appName}: processed ${this.users.length} valid adult users`;
        },
      };

      setTimeout(resolve, 1000, resultObject);
    });
  } catch (error) {
    console.error(error);
    throw new Error('File not found or JSON is invalid');
  }
}

function checkAccess(age) {
  return age >= 18 ? 'adult' : 'minor';
}

export default processUsers;
