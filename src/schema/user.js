export default `
  type User {
    id: Int!
    email: String!
    password: String!
    role: Role!
  }

  enum Role {
    doctor
    patient
  }
  type Query {
    allUsers: [User!]!
  }
  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }

  type RegisterResponse {
    data: User
    errors: [Error]
  }

  type LoginResponse {
    ok: Boolean
    token: String
    refreshToken: String
    error: [Error]
  }

  type Error {
    message: String!
  }
`;
