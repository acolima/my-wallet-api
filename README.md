# MyWallet

An easy and simple way to manage your financial transactions. 

With MyWallet you can track your incomes and expenses and always keep track of your balance.

<img src='/src/assets/mywallet.gif' alt='mywallet gif' />

Deployment: https://mywallet-f.vercel.app/

## Implemented features

- Create a new account and login
- List with all the transactions with the date, description and cost 
- Register new incomes and expenses 
- Delete and edit your records
- Organize your records by category (soon)

## Technologies
<p>
  <img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' alt="Node"/>
  
  <img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' alt="MongoDB" />

</p>

## How to run

1. Clone this repository
```bash
$ git clone git@github.com:acolima/MyWallet_Back.git
```
2. Install dependencies
```bash
$ npm i
```
3. You need to have ```mongo``` installed and running 

4. Create a ```.env``` file with the same structure of ```.env.example``` and change the value of ```MONGO_URI``` 
```bash 
MONGO_URI="{MONGO CONNECTION STRING}"
PORT=
```
5. In the front-end repository, create a ```.env``` file with the same structure of ```.env.example``` and change the value of constant ```REACT_APP_API_BASE_URL``` to
```bash
REACT_APP_API_BASE_URL="http://localhost:{PORT THAT YOU'VE SETTLED}" 
```
6. Run project with
```bash
$ npm start
```
7. You can check the front-end repository of this project at https://github.com/acolima/MyWallet_Front and follow the instructions to run
