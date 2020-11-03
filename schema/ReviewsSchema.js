exports.default = `
type userReview{
    _id : ID
    review: String
    rating: String
    reviewer: User
    createdAt: String
}
type advertizeReview{
    _id : ID
    review: String
    rating: String
    user: User
    createdAt: String
}
input userReviewInput{
    review: String!
    rating: String!
    userReviewedId: ID!
}
input advertizeReviewInput{
    review: String!
    rating: String!
    advertizeId: ID!
  }
type Query{
    getUserReviews(userId: ID!): [userReview]
    getAdvertizeReviews(advertizeId: ID!): [advertizeReview]
}
type Mutation{
    postUserReview(input: userReviewInput): userReview
    postAdvertizeReview(input: advertizeReviewInput): advertizeReview
}
`;
