exports.default = `
type User{
    _id : ID
    name: String
    firstName: String
    lastName: String
    email: String!
    type: String
    bio: String
    image: String
    joinDate: String
}
type Token{
    accessToken: String!
    refreshToken: String!
}
type Count{
    count: Int
}
input registerUserInput{
    firstName: String
    lastName: String
    email: String!
    password: String!
    client: String!
}
input updateUserInput{
    firstName: String
    lastName: String
    email: String
    bio: String
    image: String
}
input loginUserInput{
    email: String!
    password: String!
    client: String!
}
input loginWithTokenInput{
    token: String!
    client: String!
}
input resetPasswordInput{
    token: String!
    password: String!
}
input changePasswordInput{
    oldPassword: String!
    newPassword: String!
}
type Query{
    getAllUser: [User]
    getLoggedInUser: User
    getCurrentUserListingCount: Count
    getUserListingCount(id: ID!): Count
}
type Mutation{
    registerUser(input: registerUserInput!) : Boolean
    updateUser(input: updateUserInput!) : User
    loginUser(input: loginUserInput!): Boolean
    loginWithToken(input: loginWithTokenInput!): Boolean
    logoutUser: Boolean
    forgotPassword(email: String!): Boolean
    resetPassword(input: resetPasswordInput!): Token
    changePassword(input: changePasswordInput!): Token
}
`;
