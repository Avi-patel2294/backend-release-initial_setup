exports.default = `
type Categories{
    _id : ID
    name: String!
    description: String
    parent: Categories
    createdDate: String
    count: Int
    subCategories: [Categories]
}

type Query{
    getCategories: [Categories]
    getParentCategories: [Categories]
    getSubCategories(parentId: ID!): [Categories]
    getCategoryTree(categoryId: ID!): Categories
}

type Mutation{
    addCategory(name: String!, description: String, parent: String ): Categories
}
`;
