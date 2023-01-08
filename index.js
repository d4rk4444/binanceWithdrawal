import { getCoinBalance, withdraw } from '../Tools/Binance.js';
import { timeout, parseFile } from '../Tools/other.js';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

consoleStamp(console, { format: ':date(HH:MM:ss)' });

const generateRandomAmount = (min, max, num) => {
    const amount = Number(Math.random() * (max - min) + min);
    return Number(parseFloat(amount).toFixed(num));
}

(async() => {
    const wallets = parseFile('address.txt');
    const coin = process.env.COIN;
    if (wallets.length <= 1) {
        console.log(chalk.red('Add address in file'));
    } else {
        await getCoinBalance(coin).then(async function(coinBalance) {
            if (coinBalance == 0) {
                console.log(chalk.red(`${coin} balance 0`));
            } else {
                for (let i = 0; i < wallets.length; i++) {
                    if (wallets[i].length > 42) {
                        console.log(chalk.red(`Incorrect address in ${i+1} line`))
                    } else {
                        const amount = generateRandomAmount(Number(process.env.AMOUNT_MIN), Number(process.env.AMOUNT_MAX), 4);
                        await withdraw(coin, process.env.NETWORK, wallets[i], amount).then(function(id) {
                            console.log(chalk.blue(`Send: ${amount}  toAddress: ${wallets[i]}  Id: ${id}`));
                        });
                        await timeout(500);
                    }
                }
            }
        });
    }
})();