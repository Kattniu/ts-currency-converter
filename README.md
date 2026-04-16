# Currency Converter Pro - CSE 310 Module 03

## Author
Katherine Gonzales
[GitHub Repository](https://github.com/Kattniu/ts-currency-converter.git)

## Project Description
Currency Converter Pro is a full-stack web application built with TypeScript, 
Node.js, Express, and MongoDB Atlas. Users can register an account, log in, 
convert between seven world currencies, view exchange rates, and keep a full 
transaction history saved in the cloud.

This project was developed for the CSE 310 course at BYU-Idaho to demonstrate
mastery of cloud databases, REST APIs, and full-stack TypeScript development.

## Development Environment
- Language: TypeScript
- Backend: Node.js + Express
- Database: MongoDB Atlas (Cloud)
- Compiler: tsc (TypeScript Compiler)
- Tools: Visual Studio Code
- Browser: Any modern browser (Chrome, Firefox, Edge)

## How to Run
1. Clone the repository:
git clone https://github.com/Kattniu/ts-currency-converter.git
2. Install dependencies:
npm install
3. Create a `.env` file in the root folder:
MONGODB_URI=your_mongodb_connection_string
PORT=3000
4. Start the server:
npx ts-node server/server.ts
5. Open `src/pages/index.html` in your browser

## Project Structure
ts-currency-converter/
├── src/
│   ├── pages/
│   │   ├── index.html       # Welcome page
│   │   ├── register.html    # User registration
│   │   ├── login.html       # User login
│   │   ├── converter.html   # Currency converter
│   │   └── rates.html       # Exchange rates table
│   ├── scripts/             # Compiled JavaScript files
│   └── styles/
│       └── style.css
├── server/
│   ├── db.ts                # MongoDB connection
│   ├── server.ts            # Express server
│   └── routes/
│       ├── users.ts         # User API routes
│       └── conversions.ts   # Conversion API routes
├── .env                     # MongoDB credentials (not in GitHub)
├── .gitignore
├── tsconfig.json
└── README.md

## TypeScript Concepts Demonstrated
- **Interfaces** — CurrencyRates, LogEntry, User, CurrencyInfo
- **Classes** — CurrencyConverter
- **Async/Await** — All API calls use async functions
- **DOM Manipulation** — Dynamic lists, tables, and results
- **Error Handling** — try/catch on all API calls
- **Type Safety** — Strict typing on all variables and functions

## Cloud Database Concepts Demonstrated
- **MongoDB Atlas** — Cloud database storing users and conversions
- **Mongoose Schemas** — Define structure of database documents
- **REST API** — Express routes for GET and POST requests
- **fetch()** — Frontend calls to the backend API
- **Environment Variables** — Secure credentials with .env

## Useful Websites
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)