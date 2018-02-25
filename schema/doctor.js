export default `
  type Doctor {
    id: Int!
    speciality: String!
    user: User
  }

  type Mutation {
    addDoctor(
        email: String!,
        password: String!,
        speciality: String!
        ): AddDoctorResponse!
  }

  type Query {
    allDoctors: [Doctor!]!
  }

  type AddDoctorResponse {
    ok: Boolean!
    data: Doctor
    error: Error
  }
`;
