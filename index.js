import { getCoinBalanceBinance, withdrawBinance } from 'tools-d4rk444/CEX.js';
import { timeout, parseFile, generateRandomAmount } from 'tools-d4rk444/other.js';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

consoleStamp(console, { format: ':date(HH:MM:ss)' });

(async() => {
    const wallets = parseFile('address.txt');
    const coin = process.env.COIN;
    const pauseTime = generateRandomAmount(4500, 7800, 0);
    const apiSecret = process.env.BINANCE_API_SECRET;
    const apiKey = process.env.BINANCE_API_KEY;

    if (wallets.length == 0) { throw new Error('No Address in file') };

    await getCoinBalanceBinance(coin, apiSecret, apiKey).then(async(coinBalance) => {
        if (coinBalance == 0) { throw new Error('Coin Balance = 0') }; 

        for (let i = 0; i < wallets.length; i++) {
            const amount = generateRandomAmount(Number(process.env.AMOUNT_MIN), Number(process.env.AMOUNT_MAX), 5);
            await withdrawBinance(coin, process.env.NETWORK, wallets[i], amount, apiSecret, apiKey).then((id) => {
                console.log(chalk.blue(`Send: ${amount}  toAddress: ${wallets[i]}  Id: ${id}`));
            });
            await timeout(pauseTime);
        }
    });
})();