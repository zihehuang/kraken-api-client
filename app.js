'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const key = 'phnmg0BtuWRzN2GOqgx6Wq9GcDWe68FeAH4PSPl8W2v8k0/vizP2GDxv'; // API Key 
const secret = 'XoNOEHm4q1d1LFc/0uTIjwwAcp4dFFmNr5RzumnqHlTPDoWpl5GPFLu4b/IzKz/n/HwP9yuc/ymQ1wWqzITJMQ=='; // API Private Key 
const KrakenClient = require('kraken-api');
const kraken = new KrakenClient(key, secret);

_asyncToGenerator(function* () {
	// Display user's balance
	console.log((yield kraken.api('Balance')));

	// Get Ticker Info
	console.log((yield kraken.api('Ticker', { pair: 'XXBTZUSD' })));
})();
