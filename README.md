# binanceWithdrawal
Script for auto withdrawal from Binance.

# Create Binance API
1. Follow this [link](https://www.binance.com/ru/my/settings/api-management)
2. Click "Create API" and choose the first option
3. Add a trusted IP address below
4. Select "Enable Withdrawal"
5. Save the Api keys to '.env' file and confirm

# Setup
1) Set up config in '.env' file
1) Install node.js: `https://nodejs.org/en/` (LTS)
2) Open terminal
3) Download Tools/Main Script folder and install modules
```bash
git clone https://github.com/d4rk4444/binanceWithdrawal.git &&\
cd binanceWithdrawal &&\
npm i
```
5) To run the script
```bash
node index
```