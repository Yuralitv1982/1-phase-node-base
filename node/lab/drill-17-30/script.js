// @ts-check
// Drill: drill-17-30
// RAM-mode: ACTIVE
console.warn('Strict Airbnb environment is ready!');

const rawMarketData = [
  '096742,COMMERCIAL,250',
  '',
  '088691,NON-COMMERCIAL,100',
  '096742,COMMERCIAL,-50',
  'INVALID_ROW_WITHOUT_COMMAS',
  '096742,COMMERCIAL,150',
];

class MarketAnalyzer {
  static calculateCommercialVolume(rawArray) {
    const totalVolume = rawArray
      .filter((row) => {
        if (!row) return false;

        const parts = row.split(',');

        if (parts.length !== 3) return false;

        return true;
      })
      .map((row) => {
        const [, traderType, volume] = row.split(',');
        return {
          type: traderType,
          vol: Number(volume),
        };
      })
      .filter((item) => item.type === 'COMMERCIAL')
      .reduce((sum, item) => sum + item.vol, 0);

    return totalVolume;
  }
}

const result = MarketAnalyzer.calculateCommercialVolume(rawMarketData);

console.log(result);
