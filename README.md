# Downtime

So far:

## On the Server

- GraphQL Server with TypeORM/TypeGraphQL
  - Data Mapper style
  - Migrations setup
- Secure password storage
- GraphQL Resolvers using TypeGraphQL
- Many-to-many and one-to-many relations
- Lazy relations
- Field level authorization
- Resolver authorization
- Unit tests with Jest, apollo-server-testing
- Node clustering
  - Automatic restart on failure
  - One process for each core on the machine
  - Round robin load balancing

## On the Client

- Simple web interface
- Login/Signup modals
- User Profile
- Post Creation
- View posts in most recent order
- Material UI components
- Dependency Injection via React Context
- React hooks
- Typescript
- Swipeable tabs in profile

## Overall

- Docker-compose setup for development and production
- Nginx hosts static files generated from client and acts as reverse proxy to the server
