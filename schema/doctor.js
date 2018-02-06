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
    ): Doctor!
  }
`;
