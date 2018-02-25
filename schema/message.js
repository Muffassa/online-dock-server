export default `
  type Message {
    id: Int!
    receiver: User
    sender: User!
    text: String!
  }

  type Mutation {
    createMessage(
      text: String!,
      receiverId: Int!,
    ): CreateMessageResponse!
  }

  type Query {
    allMessages: [Message!]!
    dialog(receiverId: Int!): [MessageResponse]!
  }

  type MessageResponse {
    id: Int!
    receiverId: Int!
    senderId: Int!
    text: String!
    created_at: String!
  }

  type CreateMessageResponse {
    ok: Boolean,
    error: Error
  }
`;
