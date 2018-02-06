export default `
  type Message {
    id: Int!
    doctor: Int!
    patient: Patient!
    text: String!
  }
  type Query {
    getMessage(id: Int!): Message!
    allMessages: [Message!]!
  }
  type Mutation {
    createMessage(
      doctorId: Int!,
      patientId: Int!,
      text: String!,
    ): Message!
  }
`;
