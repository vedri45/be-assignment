# Backend Services for Account and Payment Management

Welcome to the backend implementation for an Account and Payment Management System. This project serves as a backend API service, providing functionality for user authentication, account management, and payment transactions. It uses a modern stack comprising Node.js, Express.js, Prisma ORM, PostgreSQL, Auth0, and Swagger UI for documentation.

## Table of Contents
###### 1. [Technology Stack](#technology-stack)
###### 2. [Project Structure](#project-structure)
###### 3. [Installation and Setup](#installation-and-setup)
###### 4. [API Endpoints](#api-endpoints)
###### 5. [Authentication](#authentication)
###### 6. [Database Models](#database-models)
###### 7. [Contributions and Contact](#contributions-and-contact)

## Technology Stack
- **Node.js**: The runtime environment for the backend service.
- **Express.js**: The web framework for building the API server.
- **Prisma ORM**: An Object-Relational Mapping tool integrated with PostgreSQL for database operations.
- **PostgreSQL**: The relational database management system.
- **express-openid-connect**: Middleware for integrating Auth0 for third-party authentication.
- **Swagger UI**: Tool for generating and viewing API documentation.

## Project Structure
The project follows a typical Node.js project structure, with source code in the `src` directory, and configurations in various dotfiles. Here is a brief overview:
- `src/`: Contains all source code, including Express routes and controllers.
- `src/controllers.js`: Contains logic for handling API requests.
- `src/routes.js`: Defines Express.js routes for different API endpoints.
- `src/users.js`: Contains logic for displaying list of users.
- `prisma/`: Contains schema, seeds, and migration folder.
- `swagger/`: Contains Swagger documentation configuration.

## Installation and Setup
To get started, follow these steps:

##### 1. **Clone the Repository**
   ```
   git clone https://github.com/vedri45/be-assignment.git
   cd be-assignment
   ```

##### 2. **Install Dependencies**
   ```
   npm install
   ```

##### 3. **Environment Variables**
   Set up your environment variables in a `.env` file. You need variables for database connection, Auth0 integration, and other configurations. An example `.env` file might look like this:
   ```
   DATABASE_URL=postgres://user:password@localhost:5432/mydb
   AUTH0_DOMAIN=your-auth0-domain
   AUTH0_CLIENT_ID=your-auth0-client-id
   AUTH0_CLIENT_SECRET=your-auth0-client-secret
   SECRET=your-your-long-random-strings
   ```

##### 4. **Start the Server**
   ```
   npm start
   ```

## API Endpoints
This backend provides several API endpoints for account management and payment processing. Here is an overview of key endpoints:

- **User Authentication**
  - `/login`: Log in using Auth0 with email and password.
  - `/logout`: Log out using Auth0.

- **Account Management**
  - `GET /users`: Retrieve all accounts for the logged-in user.
  - `GET /payment-accounts`: Retrieve all payment accounts.
  - `POST /payment-accounts`: Create a new payment account for the logged-in user.
  - `GET /payment-accounts/:accountId/history`: Retrieve all transactions for a given payment account.

- **Payment Transactions**
  - `POST /send`: Send a payment from one account to another.
  - `POST /withdraw`: Withdraw funds from a specific account.

The complete documentation for these endpoints is available via Swagger UI.

## Authentication
Authentication is handled through Auth0 using the `express-openid-connect` middleware. When users log in, they receive a JSON Web Token (JWT) that is used to authorize subsequent requests.

## Database Models
The backend uses Prisma ORM to interact with a PostgreSQL database. Here are the key models:

- **User**: Represents a registered user in the system.
- **PaymentAccount**: Represents a payment account. A user can have multiple accounts.
- **PaymentHistory**: Represents a payment transaction, containing information like amount, timestamp, and related accounts.

These models are defined in the `prisma/schema.prisma` file and can be used to manage database migrations and interactions.