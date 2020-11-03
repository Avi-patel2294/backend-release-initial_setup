exports.default = `
type Car{
    _id : ID
    make: String
    models: [String]
}
type Query{
    getCars: [Car]
}
`;
