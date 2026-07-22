// @ts-check
// Drill: drill-20-17

// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

function checkInventory() {
  return new Promise((resolve, reject) => {
    console.log('[WAIT] Checktin inventory ...');

    setTimeout(() => {
      let isMeatAvailable = true;
      if (isMeatAvailable) {
        resolve('raw meat');
      } else {
        reject(new Error('Meat is out of stock!'));
      }
    }, 1000);
  });
}

function cookFood(items) {
  return new Promise((resolve) => {
    console.log(`[WAIT] Cooking: ${items}  `);
    setTimeout(() => {
      resolve('tasty burger');
    }, 1500);
  });
}

function packFood(food) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('burger in a branded bag');
    }, 1000);
  });
}

async function serveCustomer() {
  try {
    console.log(' service started');

    const items = await checkInventory();
    const food = await cookFood(items);
    const finalOrder = await packFood(food);
    console.log('[ok] Handing to customer: ' + finalOrder);
  } catch (error) {
    console.log('[Error] Sorry, issue:  ' + error.message);
  }
}

serveCustomer();
