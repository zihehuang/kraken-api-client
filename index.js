const Promise = require('bluebird')
const key          = ''; // API Key 
const secret       = ''; // API Private Key 
const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(key, secret);

const period = 2500

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
  let openOrders
  while(!openOrders) {
	  const openOrdersCall = await kraken.api('OpenOrders')
    openOrders = Object.keys(openOrdersCall.result.open)
  }
  while(1) {
    try {
	    // Display user's balance
	    const openPositionsCall = await kraken.api('OpenPositions');
      const openPositions = openPositionsCall.result
      console.log('>>>>>>>>>>>>>>> OpenPositions count', Object.keys(openPositions).length)

      if (Object.keys(openPositions).length == 0) {
	      const getOpenOrders = await kraken.api('OpenOrders')
        openOrders = Object.keys(getOpenOrders.result.open)
        const res = await Promise.map(openOrders, (orderId) => {
	        return kraken.api('CancelOrder', {txid: orderId})
        })
        console.log('>>>>>>>>>>>>>>>> Canceled all orders', res)
        process.exit()
      }

	    // Get Ticker Info
      // const res = await kraken.api('Ticker', { pair : 'XXMRZUSD' });
      // console.log(res.result.XXMRZUSD)
      await timeout(period)
    } catch (e) {
      console.error(e)
      await timeout(period)
    }
  }
}

loop()
