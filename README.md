# supperBackendAssignment

## Prerequisites
Ensure you have the following installed on your system:
- Node Version: v20.9.0

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone : https://github.com/abdullahbinziad/supperBackendAssignment
   ```
2. Navigate to the project directory:
   ```bash
   cd supperBackendAssignment
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```

## Environment Configuration
1. Create a `.env` file in the root directory based on the provided `.env.example`.
2. Configure the environment variables as needed for your local setup.
NODE_ENV = *******
PORT = ******
DB_USER= ******
DB_PASS= *******
DATABASE_URL =******



## Running the Application
- To start the application in production mode:
  ```bash
  npm run start:prod
  ```
  This command transpiles the TypeScript code and starts the server.

- To start the application in development mode with hot reloading:
  ```bash
  npm run start:dev
  ```
  This command utilizes `ts-node-dev` for automatic transpilation and restarts the server upon file changes.

## Scripts
The project provides additional scripts to perform various tasks:
- `build`: Transpile TypeScript code to JavaScript.
- `lint`: Lint the source files using ESLint.
- `lint:fix`: Lint and automatically fix linting errors using ESLint.
- `prettier`: Format source files using Prettier.
- `prettier:fix`: Format and automatically fix formatting errors using Prettier.

