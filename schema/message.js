export default `
  type Message {
    id: Int!
    receiver: User
    sender: User!
    text: String!
  }

  type Mutation {
    createMessage(text: String!, receiverId: Int!, senderId: Int!): CreateMessageResponse!
  }

  type Query {
    allMessages: [Message!]!
  }

  type CreateMessageResponse {
    ok: Boolean,
    error: Error
  }
`;
