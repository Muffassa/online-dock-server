export default `
  type Patient {
    id: Int!
    name: String!
    emailId: Int!
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
