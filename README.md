# graphql-mysql-api

This is a project to practice GraphQl and Node.js

# Libs

- typescript
- @apollo/server
- graphql
- type-graphql

# Requirements

- Need to have node.js installed
- Need to have docker installed with docker compose

# Setup application

## Start database container

Run `$ docker-compose up -d`

## Create a .env file

Create a .env file at root directory, there's a .env.example to be used as a draft and model.

## Fill environment Variables

```
MYSQL_DATABASE=[MYSQL_DATABASE]
MYSQL_USER=[MYSQL_USER]
MYSQL_PASSWORD=[MYSQL_PASSWORD]
MYSQL_ROOT_PASSWORD=[MYSQL_ROOT_PASSWORD]
MYSQL_PORT=[MYSQL_PORT]
MYSQL_HOST=[MYSQL_HOST]
```

## Install dependencies

Run `$ npm install` to install dependencies

## Start application

Run `$ npm run start` to compile and start application.

# Available Commands

## Start application

Run `$ npm run start` to compile and start application.

## Compile application

Run `$ npm run compile` to compile application.

## Start application in watching mode

Run `$ npm run dev` to start application in watching mode.

# Modules

## Users

```
enum UserStatus {
  ACTIVE
  BLOCKED
  INACTIVE
}

input AddUserInput {
  age: Int!
  email: String!
  name: String!
}

input DeleteUserInput {
  email: String
  id: ID
}

input SearchUserInput {
  id: ID!
}

input UpdateUserInput {
  age: Int
  email: String
  id: ID
  name: String
  profile_id: ID
  salary_real: Float
  status: UserStatus
  vip: Boolean
}

type User {
  age: Int
  email: String!
  id: ID!
  name: String!
  profile: Profile!
  salary: Float
  status: UserStatus!
  vip: Boolean
}

type Mutation {
  addUser(data: AddUserInput!): User!
  deleteUser(data: DeleteUserInput!): Boolean
  updateUser(data: UpdateUserInput!): User
}

type Query {
  user(data: SearchUserInput!): User
  users: [User]!
}
```

### Queries available

- user(data: SearchUserInput!): User
- users: [User]!

### Mutations available

- addUser(data: AddUserInput!): User!
- deleteUser(data: DeleteUserInput!): Boolean
- updateUser(data: UpdateUserInput!): User

## Profiles

```
input CreateProfileInput {
  name: String!
}

input DeleteProfileInput {
  id: ID!
}

input SearchProfileInput {
  id: ID!
}

input UpdateProfileFilterInput {
  id: ID
  name: String
}

input UpdateProfileInput {
  name: String!
}

type Profile {
  id: ID!
  name: String!
}

type Mutation {
  createProfile(profile: CreateProfileInput!): Profile!
  deleteProfile(filter: DeleteProfileInput!): Boolean
  updateProfile(filter: UpdateProfileFilterInput!, profile: UpdateProfileInput!): Profile
}

type Query {
  profile(data: SearchProfileInput!): Profile
  profiles: [Profile]!
}
```

### Queries available

- profile(data: SearchProfileInput!): Profile
- profiles: [Profile]!

### Mutations available

- createProfile(profile: CreateProfileInput!): Profile!
- deleteProfile(filter: DeleteProfileInput!): Boolean
- updateProfile(filter: UpdateProfileFilterInput!, profile: UpdateProfileInput!): Profile

# Stop project

## Stop and remove containers created by docker compose

Run `$ docker-compose down`

## Stop and remove containers and remove images created by docker compose

Run `$ docker-compose down --rmi all`

## Development

To update docker images with services changes

Run this commands

1.`$ docker-compose down`  
2.`$ docker-compose build`  
3.`$ docker-compose up -d`
