export default `
  type Doctor {
    id: Int!
    name: String!
    familyName: String!
    patronymic: String!
    speciality: String!
    email: String!
    password: String!
  }
  type Error {
    message: String!
  }
  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }
  type Query {
    getDoctor(id: Int!): Doctor!
    allDoctors: [Doctor!]!
  }
  type Mutation {
    createDoctor(
      name: String!,
      familyName: String!,
      patronymic: String!,
      speciality: String!,
      email: String!,
      password: String!
    ): Boolean
    login(email: String, password: String): LoginResponse!
  }
`;
