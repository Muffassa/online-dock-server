export default `
  type Patient {
    id: Int!
    age: Int!
    user: User
  }

  type Mutation {
    addPatient(email: String!, password: String!, age: Int! ): AddDoctorResponse!
  }

  type Query {
    allPatients: [Patient!]!
  }

  type AddPatientResponse {
    data: Patient
    error: Error
  }
`;
