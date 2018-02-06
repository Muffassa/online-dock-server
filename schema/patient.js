export default `
  type Patient {
    id: Int!
    name: String!
    email: String!
    password: String!
  }
  type Query {
    getPatient(id: Int!): Patient!
    allPatients: [Patient!]!
  }
  type Mutation {
    createPatient(
      name: String!,
      email: String!,
      password: String!
    ): Patient!
  }
`;
