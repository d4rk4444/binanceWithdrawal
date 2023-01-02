import { getCoinBalance, withdraw } from '../Tools/Binance.js';
import { timeout, parseFile } from '../Tools/other.js';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

consoleStamp(console, { format: ':date(HH:MM:ss)' });

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
                        await withdraw(coin, process.env.NETWORK, wallets[i], process.env.AMOUNT).then(function(id) {
                            console.log(chalk.blue(`Send, Id: ${id}`));
                        });
                    }
                }
            }
        });
    }
})();